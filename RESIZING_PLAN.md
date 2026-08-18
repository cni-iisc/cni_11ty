# Image Resizing / Optimization Plan

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
