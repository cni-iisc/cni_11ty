const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');
const md = new markdownIt();

module.exports = () => {
  const researchRootDir = path.join(__dirname, '../researchHighlights');
  
  const years = fs.readdirSync(researchRootDir);

  const researchHighlights = {};

  years.forEach(year => {
    const yearDir = path.join(researchRootDir, year);

    if (fs.lstatSync(yearDir).isDirectory()) {
      const files = fs.readdirSync(yearDir);
      

      researchHighlights[year] = files.map(file => {
        const filePath = path.join(yearDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Parse front matter and content
        const { data, content } = matter(fileContent);

        // Only expose a video id if its locally vendored thumbnail exists
        // (assets/img/thumbs/<id>-hq.jpg, created by scripts/fetch-youtube-thumbs.js).
        // Unavailable videos (e.g. HlvZKUD153) previously rendered broken 404 images.
        const videoId = data.report_video;
        const thumbPath = path.join(__dirname, '../assets/img/thumbs', `${videoId}-hq.jpg`);
        const hasThumb = videoId && /^[A-Za-z0-9_-]{5,20}$/.test(videoId) && fs.existsSync(thumbPath);

        return {
          filename: file,
          title: data.title || "Untitled",
          speaker: data.speaker || "No speaker",
          category: data.category || "No category",
          video: hasThumb ? videoId : null,
          layout: data.layout || "research_highlight_individual",
          url: file.replace(/\.md$/, ''),
          content: md.render(content) // Convert markdown to HTML
        };
      });
    }
  });
  
  return researchHighlights;
};
