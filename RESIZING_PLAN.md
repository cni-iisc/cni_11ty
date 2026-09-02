# Image Resizing / Optimization Plan

> **STATUS: IMPLEMENTED (2026-09-01).** `@11ty/eleventy-img` v7 transform plugin is wired into
> `.eleventy.js` (formats `avif/webp/auto`, widths `[400, 800, 1200]`, filesystem cache in
> `.11ty-img-cache/`, `failOnError: false`). People cards use `eleventy:widths="230,460"`
> `sizes="230px"`; nav logo uses `120,180`/`90px` eager; fellow/visitor avatars `200,400`/`200px`.
> Build verified: 1211 images optimized; build exit 0; zero broken image refs in output.
> Incremental builds: derivatives are written to `docs/img` (kept across builds — `beforeBuild`
> wipes `docs/` except `docs/img`; derivative filenames embed a hash of the source bytes, so
> unchanged images are never re-encoded; `eleventy.after` prunes docs/img files no longer
> referenced by built HTML; `urlPath: "/img/"` disables per-page colocation so remote/newsletter
> derivatives also live in docs/img and dedupe). Fully warm local build: ~24s (2133/2133
> derivative references served from cache vs ~10-14min cold). CI caches `docs/img` +
> `.11ty-img-cache` via actions/cache with a rolling key + `restore-keys` prefix.
> Follow-ups: (1) YouTube `hqdefault.jpg` is 4:3 with baked-in letterbox bars for 16:9 videos —
> seminar thumbs got black bands; fixed with `.yt-thumb { aspect-ratio: 16/9; object-fit: cover }`
> in `assets/css/seminar_cards.css` (applied to the 4 video-thumb `<img>` tags; symmetric bars
> are cropped exactly). (2) Do NOT set `type` inside `cacheOptions` in eleventy-img v7 — it
> flows into eleventy-fetch as the *content* type; `"filesystem"` poisons the remote-fetch
> cache (images cached as garbled text, sharp fails with mojibake "Input file is missing").
> Purged the 899 poisoned `eleventy-fetch-*` cache entries. (3) The same transient write race
> (ENOENT on open of an index.html that then exists) hit once; a plain rerun succeeded —
> treat as flaky, retry the build. (4) YouTube thumbs are now fully vendored locally:
> `scripts/fetch-youtube-thumbs.js` (wired into `eleventy.before`) downloads hqdefault
> (480x360, cards use it + `.yt-thumb` crop) and mqdefault (16:9, home carousel) for every
> `recorded_video`/`report_video` id into `assets/img/thumbs/` (~8.4MB committed; skipped
> when present; new ids auto-fetched on next build). Templates now reference
> `/assets/img/thumbs/<id>-hq.jpg` / `-mq.jpg` — zero remote `img.youtube` refs in built HTML,
> all video thumbs `<picture>`-optimized. `_data/researchHighlights.js` drops video ids whose
> thumb doesn't exist (fixes the permanently-404 HlvZKUD153 broken image). (5) Quality/width
> tuning for full-column posters: AVIF quality 50→65, WebP/JPEG 75, widths [400,800,1200]
> (1600w candidates exceeded the ~200KB budget on text-dense posters; largest AVIF now 212K,
> most 80-192K). (6) Newsletter/page overflow fixed: the transform replaces an img's numeric
> `width` attr (including mailchimp's `width="100%"`) with the intrinsic pixel width, so
> content rendered at full natural width — global rule `img { max-width: 100%; height: auto }`
> added to `assets/css/navbar_style.css` (loaded on every page via base.html). Also stripped
> 735 meaningless integer/float `width` attrs from newsletter `<img>` tags (they made the
> transform generate full-resolution derivatives, e.g. a 1.3MB 5184w AVIF), and ICS fetch now
> skips/writes-only-on-change to stop the serve-mode rebuild loop caused by mtime churn on
> the watched `_data/events.json`.
> (7) FINAL FORMAT/QUALITY (user decision): single format
> **WebP** (most supported: ~97-98% incl. Safari 14+, vs AVIF ~93%/Safari 16.4+; keeps PNG
> transparency), `sharpWebpOptions: { quality: 78 }`, `widths: [400, 800, 1200, 1600]` — banners
> optimized from originals at 1600px within the user's ~400KB budget (largest derivative
> exactly 400K; q80/q85 exceeded it on text-dense posters at 412-508K). The JS carousel
> filter uses the same format/quality with widths [800, 1200, 1600]. No JPEG/PNG/AVIF
> derivatives are generated at all (docs/img dropped to 89MB, webp-only); the <picture>
> markup remains valid (single-source) and unchanged sources are never re-encoded.
> Extra fixes made while implementing: 120 `<img>` tags missing `alt` got `alt=""`; 9 dead
> Jekyll-style `/images/...` srcs repointed to `/assets/img/posts/...`; `pages/workshops.html`
> hardcoded card's `{{ workshop.data.img }}` (outside loop → `src="/"`) replaced with
> `wifi-optimisation.jpg`; seminar front-matter paths corrected (missing extensions, wrong dir,
> wrong case); `recorded_video`/`img` guards changed to truthy checks; YouTube thumbnails
> switched `maxresdefault` → `hqdefault` (some 404); `SoumilMukherjee.png` was a mislabeled BMP,
> re-encoded as real PNG; CI bumped to Node 20 + image cache step.

## Problem

`assets/images/` holds **66.5 MB across 155 raster files** (118 JPG, 29 PNG, 8 JPEG,
1 WEBP). Today `.eleventy.js` does `addPassthroughCopy("assets")`, so every original is
copied verbatim into `docs/` and shipped to browsers at full resolution.

The worst offenders are people photos rendered inside **230px-wide** cards
(`.card { width: 230px }` in `assets/css/people.css`), yet the source files are enormous:

| File | Size | Rendered at |
|------|------|-------------|
| `people/staff/SourakantiMisra.png` | 7.31 MB | 230px card |
| `people/staff/gautham.png` | 5.33 MB | 230px card |
| `people/staff/AkhilT.jpg` | 5.13 MB | 230px card |
| `people/staff/IMG_9232.JPG` | 4.74 MB | 230px card |
| `people/staff/Poorvi_Deshpande.JPG` | 3.16 MB | 230px card |

A 230px card at 2× DPI needs a ~460px-wide image (tens of KB), not a 7 MB one.

## Chosen framework: `@11ty/eleventy-img` (official plugin) — HTML Transform mode

The official Eleventy image plugin, built on **sharp**. We use its **HTML Transform**
(`eleventyImageTransformPlugin`), not the `{% image %}` shortcode.

**Why the transform and not the shortcode:**

- It post-processes **every `<img>` in the built HTML automatically**, so we do **not**
  have to rewrite the ~30 templates that contain `<img>` tags (including the
  `{{ person.data.img }}` cards). One config block covers the whole site.
- All work happens **at build time** in Node/sharp — **zero client-side JavaScript**
  (requirement 4).
- It emits a `<picture>` element with one `<source>` per modern format **plus the
  original format as the `<img>` fallback** — so incompatible browsers still get a
  working image (requirement 3).
- It automatically adds `srcset` + `sizes` (responsive selection), intrinsic
  `width`/`height` (prevents layout shift), and `loading="lazy"` / `decoding="async"`.

**Formats:** `["avif", "webp", "auto"]`

- `avif` — best compression; supported in all current browsers (Chrome/Edge 85+,
  Firefox 93+, Safari 16.4+).
- `webp` — near-universal fallback (Chrome 32+, Firefox 65+, Safari 14+).
- `auto` — keeps each image's **original format** (JPEG stays JPEG, **PNG stays PNG**)
  as the final `<img>` fallback for any browser that supports neither AVIF nor WebP.
  Using `auto` (rather than a hard-coded `jpeg`) matters because several sources are
  **PNGs with transparency** (e.g. the nav logo) that must not be flattened onto a
  background.

The browser walks the `<picture>` sources top-to-bottom and picks the first format it
understands, falling back to the plain `<img>`. This is the standard, universally-safe
mechanism.

## Widths & `sizes` (serving small images to small slots — requirement 2)

Global defaults (applied to every image):

- `widths: [400, 800, 1200]` — eleventy-img **never upscales**, so a source smaller than
  a width is simply skipped; the 1200px cap kills the multi-MB full-res payloads.
- Default `sizes: "100vw"` (safe fallback for full-width content).

Per-context override where the slot is known and small — set directly as attributes on
the `<img>` tags in the relevant templates:

- **People cards** (`pages/staff.njk`, `past_staff.njk`, `interns.njk`,
  `past_interns.njk`, `postdocs.njk`, `faculty.njk`, `_includes/fellows.html`,
  `_includes/visitors.html`): add
  `sizes="230px"` and `eleventy:widths="230,460"` — so a card only ever downloads a
  ~230/460px image instead of a 1200px one.
- **Nav logo** (`_includes/base.html`, rendered at 60px tall, appears on every page):
  add `eleventy:widths="120,180"`, `sizes="90px"`, and keep it eager
  (`loading="eager"`) since it is above the fold.

Everything else (home hero, seminar posters, project/hackathon banners) uses the global
`[400, 800, 1200]` defaults, which is appropriate for their larger render sizes.

## Concrete changes

### 1. `package.json`
- Add dependency `@11ty/eleventy-img` (pulls in `sharp` with prebuilt binaries).

### 2. `.eleventy.js`
- `const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");`
- Register the plugin:

```js
eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  extensions: "html",
  formats: ["avif", "webp", "auto"],
  widths: [400, 800, 1200],
  defaultAttributes: {
    loading: "lazy",
    decoding: "async",
    sizes: "100vw",
  },
});
```

- Keep `addPassthroughCopy("assets")` as-is. The transform reads the passthrough-copied
  original from the output dir (`docs/assets/...`, matching the existing
  `src="/assets/images/..."` absolute paths) and writes optimized derivatives into
  `docs/img/`. Passthrough must remain so the source file is present for sharp to read
  and so any non-`<img>` references (favicons, CSS) keep working.

### 3. Template tweaks (attributes only — no structural changes)
- Add `sizes` / `eleventy:widths` to the people-card `<img>` tags and the nav logo, as
  listed above. These are the only template edits, and they are additive attributes.

### 4. GitHub Actions — `.github/workflows/eleventy_build.yml` (requirement 5)
- Resizing needs no new step: it runs inside the existing `npx @11ty/eleventy` build,
  because the plugin is now part of the config and `npm ci` installs it.
- Bump `actions/setup-node` from `node-version: 18` to **`20`** (current eleventy-img +
  sharp expect Node 18.17+/20; local dev here is Node 26). Low-risk, keeps CI healthy.
- **Optional build-speed step:** cache eleventy-img output between runs so ~155 images ×
  3 formats aren't re-encoded every push:

```yaml
- name: Cache optimized images
  uses: actions/cache@v4
  with:
    path: .11ty-img-cache
    key: eleventy-img-${{ hashFiles('assets/images/**') }}
```

  (paired with an `eleventy:output`/cache dir setting). If we skip this, the only cost is
  ~1–2 min of extra build time per push — acceptable, so this step is optional.

## Expected outcome
- People-card images drop from multi-MB to tens of KB (AVIF/WebP at ~460px).
- Total transferred image weight for a page like `/staff/` falls by well over 90%.
- Modern browsers get AVIF; slightly older get WebP; everything else gets the original
  JPEG/PNG — all with no JavaScript.
- Intrinsic `width`/`height` on every image eliminates layout shift.

## Verification
1. `npx @11ty/eleventy` locally; confirm build succeeds and `docs/img/` fills with
   `.avif` / `.webp` / fallback derivatives.
2. Inspect a built page (e.g. `docs/staff/index.html`): each card `<img>` is now a
   `<picture>` with `<source type="image/avif">`, `<source type="image/webp">`, and an
   `<img>` fallback carrying `srcset`, `sizes`, `width`, `height`.
3. Spot-check derivative sizes in `docs/img/` (card images should be tens of KB).
4. `npm run serve` and confirm all people pages, home, and seminar images render.

## Rollback
All changes are in `.eleventy.js`, `package.json`, the workflow, and additive template
attributes — revert via git. Originals are untouched on disk.

## Open questions for approval
1. **Widths** `[400, 800, 1200]` and card override `[230, 460]` — good, or do you want a
   retina-heavier set (e.g. cards `[230, 460, 690]`)?
2. **Node bump to 20** in CI — OK?
3. **CI image caching** — include the optional cache step now, or keep CI simple and
   accept ~1–2 min extra build time?
4. **Derivative output location** `docs/img/` and derivatives committed to the `gh-pages`
   branch by the existing deploy — acceptable (they are build artifacts, regenerated each
   build)?
