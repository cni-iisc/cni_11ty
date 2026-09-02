const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier-terser");
const fs = require("fs"); // Import the fs module
const path = require('path');
const https = require('https');
const ical = require('ical');
const zlib = require('zlib');
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss");
const browserslist = require("browserslist");
const { transform, browserslistToTargets } = require("lightningcss");
const mathjaxPlugin = require("eleventy-plugin-mathjax");
const { eleventyImageTransformPlugin, default: Image } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Add the plugin with default settings (SVG output)
  eleventyConfig.addPlugin(mathjaxPlugin);

  // Automatic image optimization: post-process every <img> in the built HTML.
  // Emits <picture> with avif/webp sources + original-format fallback, adds
  // responsive srcset/sizes, intrinsic width/height, lazy loading.
  // Derivatives go to <output>/img/; originals stay in <output>/assets/ via
  // the passthrough copy (also needed for favicon/CSS references).
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    // Single format: WebP — supported by ~97-98% of browsers (Chrome 32+,
    // Firefox 65+, Safari 14+, Edge 18+), more than AVIF (~93%, Safari 16.4+),
    // and it keeps transparency (important for the PNG logos).
    formats: ["webp"],
    // Posters spanning the full column were noticeably over-compressed at
    // sharp's defaults. Per user spec: banners optimized from the originals at
    // 1600px, up to ~400KB — measured WebP q85 at 1600w lands at 146-277K for
    // the heaviest posters, so quality 85 with a 1600w candidate. Cards keep
    // their small eleventy:widths overrides; smaller sources never upscale.
    // NOTE: the derivative hash excludes the widths list, so width changes
    // re-encode nothing — only quality/format options do.
    widths: [400, 800, 1200, 1600],
    sharpWebpOptions: { quality: 78 },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "100vw",
    },
    // Route ALL derivatives into <output>/img/ (default behavior already does
    // this for absolute srcs, but remote srcs like newsletter images get
    // "colocated" into each page's directory — duplicating ~2k files and
    // defeating the incremental build, since page dirs are wiped every build).
    // Setting urlPath explicitly disables colocation entirely.
    urlPath: "/img/",
    cacheOptions: {
      // NOTE: do NOT set `type` here — in eleventy-img v7 cacheOptions.type flows
      // into eleventy-fetch as the *content* type ("buffer" is the correct default
      // for remote images); "filesystem" there poisons the fetch cache (remote
      // images cached as text, read back as a String, and sharp fails with
      // "Input file is missing"). The derivative/output cache is a disk cache
      // independent of this option.
      duration: "1y",
      directory: ".11ty-img-cache",
    },
    // Keep a dead/404 image as-is (like the pre-plugin site) instead of failing
    // the whole build — e.g. remote thumbnails that no longer exist.
    failOnError: false,
  });
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addFilter("formatDateTime", (date) => {
    return DateTime.fromJSDate(new Date(date)).toFormat("dd MMM yyyy, h:mm a");
    // e.g. 30 May 2025, 4:30 pm
  });


  // The home-page carousel builds its <img> elements client-side from a JSON
  // blob, so the HTML transform never sees those images and they would be
  // served as raw passthrough originals (up to 2.5MB). This filter generates
  // an optimized webp derivative (cached in docs/img like everything else,
  // existence-based so unchanged sources are never re-encoded) and returns
  // { src, srcset } for the carousel JSON.
  eleventyConfig.addNunjucksAsyncFilter("carouselImg", (src, callback) => {
    (async () => {
      try {
        let s = src;
        // prefer the vendored maxres thumbnail for video items when available
        // (the -mq.jpg used by the carousel JSON is only 320px wide and would
        // be upscaled to full viewport width)
        const mq = s.match(/^\/assets\/img\/thumbs\/(.+)-mq\.jpg$/);
        if (mq) {
          const maxPath = path.join(__dirname, "assets/img/thumbs", `${mq[1]}-max.jpg`);
          if (fs.existsSync(maxPath)) s = `/assets/img/thumbs/${mq[1]}-max.jpg`;
        }
        const stats = await Image(s.replace(/^\//, ""), {
          widths: [800, 1200, 1600],
          formats: ["webp"],
          outputDir: path.join(__dirname, "docs/img"),
          urlPath: "/img/",
          sharpWebpOptions: { quality: 78 },
          cacheOptions: { duration: "1y", directory: ".11ty-img-cache" },
        });
        const cands = stats.webp || [];
        const srcset = cands.map((c) => `${c.url} ${c.width}w`).join(", ");
        return { src: cands.length ? cands[cands.length - 1].url : src, srcset };
      } catch (e) {
        console.warn("⚠️  carouselImg failed for", src, e.message);
        return { src, srcset: "" }; // graceful fallback to the original
      }
    })().then(
      (r) => callback(null, r),
      (e) => callback(e)
    );
  });

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("assets");

  //copy CNAME file
  eleventyConfig.addPassthroughCopy("CNAME");

  //ignore pre-built rpcourse from template processing
  eleventyConfig.ignores.add("courses/random/**");

  //ignore root-level planning docs (no front matter, contain template syntax)
  eleventyConfig.ignores.add("RESIZING_PLAN.md");

  //copy pre-built rpcourse content to output after build
  eleventyConfig.on('eleventy.after', async () => {
    const src = path.join(__dirname, 'courses/random');
    const dest = path.join(__dirname, 'docs/courses/random');
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log('✅ Copied rpcourse content to docs/courses/random');

    // Prune stale derivative images from docs/img. Every non-serve build
    // rewrites ALL pages, so any docs/img file not referenced by the built
    // HTML is a leftover of a changed/removed source — safe to delete (keeps
    // the derivative cache and the gh-pages deploy from growing unbounded).
    if (process.env.ELEVENTY_RUN_MODE !== "serve") {
      const imgDir = path.join(__dirname, "docs/img");
      if (fs.existsSync(imgDir)) {
        const referenced = new Set();
        const collect = (dir) => {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const p = path.join(dir, entry.name);
            if (entry.isDirectory()) collect(p);
            else if (entry.name.endsWith(".html")) {
              for (const m of fs.readFileSync(p, "utf8").matchAll(/\/img\/[A-Za-z0-9._-]+/g)) {
                referenced.add(m[0]);
              }
            }
          }
        };
        collect(path.join(__dirname, "docs"));
        let pruned = 0;
        for (const f of fs.readdirSync(imgDir)) {
          if (!referenced.has(`/img/${f}`)) {
            fs.rmSync(path.join(imgDir, f), { force: true });
            pruned++;
          }
        }
        if (pruned) console.log(`🧹 Pruned ${pruned} stale derivative(s) from docs/img`);
      }
    }
  });
  // Custom filter to format time
  eleventyConfig.addFilter("formatTime", (date) => {
    return DateTime.fromJSDate(new Date(date)).toFormat("h:mm a"); // Format as 12-hour clock with AM/PM
  });

  eleventyConfig.addFilter("currentTime", () => {
    return DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"); // Format as required
  });

  // Add a custom Nunjucks date filter
  eleventyConfig.addNunjucksFilter("date", (date, format) => {
    return DateTime.fromJSDate(new Date(date)).toFormat(format);
  });

  eleventyConfig.addFilter("utcDate", (date) => {
    // Convert the date to UTC
    return DateTime.fromJSDate(date, { zone: "UTC" }).toFormat(
      "yyyy-MM-dd HH:mm:ss"
    );
  });

  eleventyConfig.addFilter("localDate", (date) => {
    return DateTime.fromJSDate(date,  { zone: "UTC" }).toLocal().toFormat("yyyy-MM-dd HH:mm:ss");
  });



  eleventyConfig.addNunjucksFilter("upcoming", function (collection) {
    const carouselCfg = require("./_data/carousel.json");
    const afterSeconds = (carouselCfg.showSeminarAfterSeconds || 3600) * 1000;
    const cutoff = new Date(Date.now() - afterSeconds);
    return collection.filter(item => item.date > cutoff);
  });

  eleventyConfig.addNunjucksFilter("showcases", function (collection) {
    return collection.filter(item => item.data.showcase);
  });

  eleventyConfig.addCollection("updates", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./updates/*.md", "./updates/*.html"])
      .reverse();
  });
  // Collection to fetch all newsletter files
  eleventyConfig.addCollection("newsletters", function (collectionApi) {
    return collectionApi.getFilteredByGlob("newsletters/*/*.md")
    .reverse();
  });

  eleventyConfig.addCollection("schools", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./schools/*.md",
      "./schools/*.html",
    ]);
  });
  // Wipe the output dir, but KEEP docs/img: eleventy-img's derivative disk
  // cache is existence-based (a derivative file present at its expected output
  // path is reused without re-encoding), and derivative filenames embed a hash
  // of the source bytes — so unchanged images are never re-encoded across
  // builds (incremental builds). Changed/removed sources simply produce new
  // hashed filenames; stale leftovers are pruned in the eleventy.after hook.
  eleventyConfig.on("beforeBuild", () => {
    const outputDir = "docs";
    if (fs.existsSync(outputDir)) {
      for (const entry of fs.readdirSync(outputDir)) {
        if (entry === "img") continue; // preserve eleventy-img derivative cache
        fs.rmSync(path.join(outputDir, entry), { recursive: true, force: true });
      }
    }
  });
  eleventyConfig.addCollection("hackathons", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./hackathons/*.md",
      "./hackathons/*.html",
    ]);
  });
  eleventyConfig.addCollection("workshops", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./workshops/*/*.md",
      "./workshops/*/*.html",
    ]);
  });

  eleventyConfig.addCollection("courses", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./courses/*.md",
      "./courses/*.html",
    ]);
  });

  eleventyConfig.addCollection("covidResponses", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./covid-19-response/*.md"
    ]);
  });

  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./projects/*.md"
    ]);
  });

  eleventyConfig.addCollection("seminars", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./seminars/*.md", "./seminars/*/*.md"]);
  });

  // Add the researchHighlights to the collections
  eleventyConfig.addCollection("researchHighlights", function (collectionApi) {
    const highlights = require("./_data/researchHighlights")();
    return highlights;
  });

  eleventyConfig.addCollection("Fellows", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./_people/*.md", "./_people/phd_fellows/*.md", "./_people/mtech_fellows/*.md"])
      .filter(
        (person) =>
          person.data.category === "Ph.D. Fellows/Scholars" ||
          person.data.category === "M.Tech. Fellows/Scholars"
      );
  });

  eleventyConfig.addCollection("Staff", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./_people/staff/*.md", "./_people/*.md"])
      .filter((person) => person.data.category === "Staff");
  });

  eleventyConfig.addCollection("Interns", function () {
    // data-driven from _data/interns.yml instead of _people/interns/*.md
    const interns = yaml.load(
      fs.readFileSync(path.join(__dirname, "_data/interns.yml"), "utf8")
    );
    // sort: duration_to reverse-chronological (ongoing first), then duration_from reverse-chronological
    const sortKey = (p, field) =>
      field === "duration_to" && p.duration_to === "ongoing" ? "9999-99" : p[field] || "";
    return interns
      .slice()
      .sort(
        (a, b) =>
          sortKey(b, "duration_to").localeCompare(sortKey(a, "duration_to")) ||
          sortKey(b, "duration_from").localeCompare(sortKey(a, "duration_from"))
      );
  });

  eleventyConfig.addFilter("formatMonth", (ym) => {
    if (ym === "ongoing") return "Ongoing";
    if (!ym) return "";
    const [y, m] = String(ym).split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[Number(m) - 1] || ""} ${y}`.trim();
  });

  eleventyConfig.addCollection("Postdocs", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./_people/postdoc/*.md")
      .filter((person) => person.data.category === "Postdoc");
  });

  eleventyConfig.addCollection("Faculty", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./_people/faculty/*.md")
      .filter((person) => person.data.category === "Faculty");
  });

  eleventyConfig.addFilter("sortByNumber", function (array, attribute) {
    return array.sort((a, b) => {
      // Convert to numbers if necessary, or zero-pad to ensure correct numeric order
      const aVal = Number(parseInt(a.data[attribute], 10)) || 0;
      const bVal = Number(parseInt(b.data[attribute], 10)) || 0;
      // Sort in descending order
      return bVal - aVal;
    });
  });

  eleventyConfig.addFilter("startsWith", function(str, prefix) {
    return str.startsWith(prefix);
});

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Add a custom filter to format authors
  eleventyConfig.addFilter("formatAuthors", function (authors) {
    // Split authors based on ', and' for the last author
    const authorList = authors.split(" and ").map((author) => author.trim());

    // Handle individual author name separation if they contain commas
    const formattedAuthors = authorList.map((author) => {
      // Further split by commas if there are middle names or initials
      const nameParts = author.split(/\s*,\s*/).map((part) => part.trim());
      // swap first and last name
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      nameParts[0] = lastName;
      nameParts[nameParts.length - 1] = firstName;
      return nameParts.join(" "); // Join back without commas
    });

    if (formattedAuthors.length === 1) {
      // If there's only one author, return it as is
      return formattedAuthors[0];
    } else if (formattedAuthors.length === 2) {
      // If there are two authors, join them with 'and'
      return formattedAuthors.join(" and ");
    } else {
      // If there are three or more authors, list all but the last with commas and the last with 'and'
      return (
        // swap first and last name
        formattedAuthors.slice(0, -1).join(", ") +
        ", and " +
        formattedAuthors[formattedAuthors.length - 1]
      );
    }
  });

  eleventyConfig.on('eleventy.before', async () => {
    // Vendor YouTube thumbnails locally (see scripts/fetch-youtube-thumbs.js);
    // existing files are skipped, so this is a no-op after the first run.
    try {
      await require('./scripts/fetch-youtube-thumbs')();
    } catch (err) {
      console.warn('⚠️  [thumbs] thumbnail prefetch failed:', err.message);
    }

    const icsUrl = 'https://outlook.office365.com/owa/calendar/cf7d500ee50e4c7b876fb1845efe821d@iisc.ac.in/22ed80c434a3478d9ba6316fbfed35137860062344497390190/calendar.ics'; // replace this
    const outputPath = path.join(__dirname, '_data/events.json');

    function fetchICS(url) {
      return new Promise((resolve, reject) => {
        const options = {
          headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/calendar, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
          }
        };

        https.get(url, options, (res) => {
          let data = [];

          // Handle redirects
          if (res.statusCode === 301 || res.statusCode === 302) {
            return fetchICS(res.headers.location).then(resolve).catch(reject);
          }

          res.on('data', chunk => data.push(chunk));
          res.on('end', () => {
            const buffer = Buffer.concat(data);
            const encoding = res.headers['content-encoding'];

            if (encoding === 'gzip') {
              zlib.gunzip(buffer, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded.toString());
              });
            } else if (encoding === 'deflate') {
              zlib.inflate(buffer, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded.toString());
              });
            } else {
              resolve(buffer.toString());
            }
          });
        }).on('error', err => reject(err));
      });
    }

    try {
      // Skip the fetch entirely when the file was (re)written very recently —
      // otherwise every watch-mode rebuild re-fetches, rewrites the file (mtime
      // bump) and the file watcher immediately triggers ANOTHER rebuild (loop).
      if (fs.existsSync(outputPath)) {
        const age = Date.now() - fs.statSync(outputPath).mtimeMs;
        if (age < 10 * 60 * 1000) {
          console.log('ℹ️  _data/events.json is fresh (<10 min old); skipping ICS fetch');
          return;
        }
      }

      const data = await fetchICS(icsUrl);
      const parsed = ical.parseICS(data);
      const now = new Date();

      const events = Object.values(parsed)
        .filter(e => e.type === 'VEVENT' && new Date(e.start) >= now && e.summary !== 'Private Appointment')
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .map(e => ({
          summary: e.summary,
          description: e.description,
          location: e.location,
          start: e.start,
          end: e.end
        }));

      // Write only when the content actually changed (mtime churn on an
      // unchanged file re-triggers the watch-mode rebuild loop).
      const json = JSON.stringify(events, null, 2);
      const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : null;
      if (current !== json) {
        fs.writeFileSync(outputPath, json);
        console.log(`✅ Fetched and saved ${events.length} events to _data/events.json`);
      } else {
        console.log('ℹ️  _data/events.json unchanged; not rewritten');
      }
    } catch (err) {
      console.error('❌ Failed to fetch .ics:', err);
    }
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
  };
};
