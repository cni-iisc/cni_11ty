const bibtexParse = require('bibtex-parse');
const fs = require('fs');

// Read and parse the BibTeX file
module.exports = () => {
  const bibtex = fs.readFileSync('_data/papers.bib', 'utf8');
  const parsedEntries = bibtexParse.entries(bibtex);
  return parsedEntries; 
};
