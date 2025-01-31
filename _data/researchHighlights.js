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
        
        return {
          filename: file,
          title: data.title || "Untitled",
          speaker: data.speaker || "No speaker",
          category: data.category || "No category",
          video: data.report_video || "No video",
          layout: data.layout || "research_highlight_individual",
          url: file.replace(/\.md$/, ''),
          content: md.render(content) // Convert markdown to HTML
        };
      });
    }
  });
  
  return researchHighlights;
};
