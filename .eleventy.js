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

module.exports = function (eleventyConfig) {
  // Add the plugin with default settings (SVG output)
  eleventyConfig.addPlugin(mathjaxPlugin);
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addFilter("formatDateTime", (date) => {
    return DateTime.fromJSDate(new Date(date)).toFormat("dd MMM yyyy, h:mm a");
    // e.g. 30 May 2025, 4:30 pm
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
  eleventyConfig.on("beforeBuild", () => {
    const outputDir = "docs";
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
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

      fs.writeFileSync(outputPath, JSON.stringify(events, null, 2));
      console.log(`✅ Fetched and saved ${events.length} events to _data/events.json`);
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
