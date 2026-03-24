const bibtexParse = require("bibtex-parse");
const fs = require("fs");

const MONTH_FULL = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_ORDER = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function monthToNum(month) {
  if (!month) return 0;
  return MONTH_ORDER[month.toLowerCase().trim()] || 0;
}

// Read and parse the BibTeX file
module.exports = () => {
  const bibtex = fs.readFileSync("_data/new_papers_with_pdfs.bib", "utf8");
  const parsedEntries = bibtexParse.entries(bibtex);
  return parsedEntries
    .filter((entry) => !(entry.NOTE && entry.NOTE.toLowerCase().includes("submitted")))
    .map((entry) => {
      const num = monthToNum(entry.MONTH);
      if (num) entry.MONTH = MONTH_FULL[num];
      return entry;
    })
    .sort((a, b) => {
      const yearDiff = (parseInt(b.YEAR) || 0) - (parseInt(a.YEAR) || 0);
      if (yearDiff !== 0) return yearDiff;
      return monthToNum(b.MONTH) - monthToNum(a.MONTH);
    });
};
