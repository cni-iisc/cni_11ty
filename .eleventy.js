const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({
    "./admin/config.yml": "./admin/config.yml",
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

  eleventyConfig.addCollection("updates", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./updates/*.md", "./updates/*.html"])
      .reverse();
  });
  // Collection to fetch all newsletter files
  eleventyConfig.addCollection("newsletters", function (collectionApi) {
    return collectionApi.getFilteredByGlob("newsletters/*.md").sort((a, b) => {
      return new Date(b.fileSlug) - new Date(a.fileSlug); // Sort by filename date
    });
  });

  eleventyConfig.addCollection("schools", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./schools/*.md",
      "./schools/*.html",
    ]);
  });
  eleventyConfig.addCollection("hackathons", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./hackathons/*.md",
      "./hackathons/*.html",
    ]);
  });
  eleventyConfig.addCollection("workshops", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./workshops/*.md",
      "./workshops/*.html",
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
      "./covidresponse/*.md",
      "./covidresponse/*.html",
    ]);
  });

  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob([
      "./projects/*.md",
      "./projects/*.html",
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
        formattedAuthors.slice(0, -1).join(", ") +
        ", and " +
        formattedAuthors[formattedAuthors.length - 1]
      );
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
