const path = require('path');
const w2v = require('word2vec');
const vectorFile = path.resolve(__dirname, './vector_filtered.txt');

const getClosest = (word) => {
  w2v.loadModel(vectorFile, (err, model) => {
    if (err) console.log('Error! -', err);
    else console.log(`Similar words to ${word}\n`, model.mostSimilar(word, 20));
  });
};

getClosest('upgrade');
