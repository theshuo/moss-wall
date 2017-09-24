const fs = require('fs');
const path = require('path');
const vocab = path.resolve(__dirname, './vocab_full.txt');
const wordlist = path.resolve(__dirname, './wordlist.txt');
const target = path.resolve(__dirname, './vocab_filtered.txt');

const promiseFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, file) => {
    if (err) reject(err);
    else resolve(file);
  });
});

const buildVocab = (baseFile, filterFile, outputFile) => {
  // Pretty poorly optimized, to say the least
  Promise.all([promiseFile(baseFile), promiseFile(filterFile)])
    .then(files => new Promise((resolve, reject) => {
      const filterMap = files[1].split('\n');
      const filteredData = files[0].split('\n').filter(line => {
        let word = line.match(/^\w+/);
        return word && filterMap.includes(word[0]);
      }).join('\n');
      fs.writeFile(outputFile, filteredData, err => {
        if (err) reject(err);
        else resolve();
      });
    }))
    .catch(err => console.log(err));
};

buildVocab(vocab, wordlist, target);
