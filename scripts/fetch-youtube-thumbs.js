/**
 * Download YouTube video thumbnails locally so every video thumbnail on the
 * site is served as a local, build-optimized image (uniform with all other
 * images) instead of a sometimes-flaky remote fetch of
 * https://img.youtube.com/vi/<id>/hqdefault.jpg.
 *
 * Two variants are vendored:
 *   assets/img/thumbs/<id>-hq.jpg  — hqdefault.jpg  (480x360, 4:3 with baked-in
 *                                    letterbox bars for 16:9 videos; cards crop
 *                                    the bars via the .yt-thumb CSS class)
 *   assets/img/thumbs/<id>-mq.jpg  — mqdefault.jpg  (320x180, 16:9, no bars;
 *                                    used by the home-page carousel whose box
 *                                    is wider than 16:9)
 *
 * Sources of ids:
 *   every seminars .md file (recursive) -> `recorded_video` front matter
 *   every researchHighlights .md file   -> `report_video` front matter
 * Home-carousel (mq) ids additionally include every seminar passing the
 * `upcoming` filter used by pages/home.html (date > now - showSeminarAfterSeconds).
 *
 * Existing files are skipped, so this is cheap after the first run. New video
 * ids added by content edits are fetched automatically on the next build and
 * should be committed with the content change.
 *
 * Run standalone:  node scripts/fetch-youtube-thumbs.js
 * Also wired into `.eleventy.js`'s `eleventy.before` hook.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const THUMB_DIR = path.join(ROOT, "assets", "img", "thumbs");

function collectVideoIds(dir, field) {
  const ids = new Map(); // id -> source file
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".md")) {
        const text = fs.readFileSync(p, "utf8");
        const m = text.match(new RegExp(`^${field}:\\s*(.+)$`, "m"));
        if (m) {
          const v = m[1].trim().replace(/^["']|["']$/g, "");
          if (v && /^[A-Za-z0-9_-]{5,20}$/.test(v)) ids.set(v, p);
        }
      }
    }
  };
  walk(dir);
  return ids;
}

function collectUpcomingSeminarIds() {
  // Replicates the `upcoming` filter in .eleventy.js used by pages/home.html
  let afterSeconds = 3600;
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "_data/carousel.json"), "utf8"));
    if (cfg.showSeminarAfterSeconds) afterSeconds = cfg.showSeminarAfterSeconds;
  } catch (e) { /* fall back to default */ }
  const cutoff = new Date(Date.now() - afterSeconds * 1000);
  const ids = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".md")) {
        const text = fs.readFileSync(p, "utf8");
        const dm = text.match(/^date:\s*(.+)$/m);
        const vm = text.match(/^recorded_video:\s*(.+)$/m);
        if (dm && vm) {
          const v = vm[1].trim().replace(/^["']|["']$/g, "");
          if (v && /^[A-Za-z0-9_-]{5,20}$/.test(v)) {
            const d = new Date(dm[1].trim());
            if (!isNaN(d) && d > cutoff) ids.push(v);
          }
        }
      }
    }
  };
  walk(path.join(ROOT, "seminars"));
  return ids;
}

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 3) return reject(new Error("too many redirects"));
    const req = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "image/jpeg,image/*;q=0.8,*/*;q=0.5",
      },
      timeout: 20000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchBuffer(new URL(res.headers.location, url).href, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

async function downloadThumb(id, variant, attempts = 3) {
  const variantMap = { hq: "hqdefault", mq: "mqdefault", max: "maxresdefault" };
  const url = `https://img.youtube.com/vi/${encodeURIComponent(id)}/${variantMap[variant] || "hqdefault"}.jpg`;
  const dest = path.join(THUMB_DIR, `${id}-${variant}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) return { id, variant, status: "exists" };
  for (let i = 1; i <= attempts; i++) {
    try {
      const buf = await fetchBuffer(url);
      // verify it is actually a JPEG (YouTube returns a 120x90 placeholder on
      // 404 with HTTP 200 for some ids, so also require a plausible size)
      if (buf.length < 3000 || buf[0] !== 0xff || buf[1] !== 0xd8) {
        throw new Error(`not a valid JPEG (${buf.length} bytes)`);
      }
      fs.mkdirSync(THUMB_DIR, { recursive: true });
      fs.writeFileSync(dest, buf);
      return { id, variant, status: "downloaded", bytes: buf.length };
    } catch (e) {
      if (i === attempts) return { id, variant, status: "failed", error: e.message };
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

async function runLimited(tasks, limit = 10) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const t = tasks[i++];
      results.push(await t());
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

module.exports = async function fetchYouTubeThumbs() {
  const seminarIds = collectVideoIds(path.join(ROOT, "seminars"), "recorded_video");
  const highlightIds = collectVideoIds(path.join(ROOT, "researchHighlights"), "report_video");
  const allIds = new Map([...seminarIds, ...highlightIds]);
  const mqIds = new Set(collectUpcomingSeminarIds());

  const tasks = [];
  for (const id of allIds.keys()) tasks.push(() => downloadThumb(id, "hq"));
  for (const id of mqIds) {
    tasks.push(() => downloadThumb(id, "mq"));
    // carousel displays at full viewport width — vendor the 1280x720
    // maxresdefault thumbnail when available (falls back to -hq in the
    // carouselImg filter when YouTube has no maxres for this id)
    tasks.push(() => downloadThumb(id, "max"));
  }

  const results = await runLimited(tasks);
  const downloaded = results.filter((r) => r.status === "downloaded");
  const failed = results.filter((r) => r.status === "failed");
  const existing = results.filter((r) => r.status === "exists");

  if (downloaded.length) console.log(`✅ [thumbs] downloaded ${downloaded.length} YouTube thumbnail(s)`);
  console.log(`ℹ️  [thumbs] ${existing.length} already present, ${allIds.size} hq + ${mqIds.size} mq referenced`);
  if (failed.length) {
    console.warn(`⚠️  [thumbs] FAILED for ${failed.length} request(s):`);
    for (const f of failed) console.warn(`   ${f.id}-${f.variant}: ${f.error}`);
  }
  return { downloaded: downloaded.length, failed: failed.length };
};

if (require.main === module) {
  module.exports().then(
    (r) => process.exit(r.failed ? 1 : 0),
    (e) => { console.error(e); process.exit(1); }
  );
}
