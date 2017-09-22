const path = require('path');
const w2v = require('word2vec');
const vectorFile = path.resolve(__dirname, './text8-vector.bin');
const twitterFile = path.resolve(__dirname, '../word2vec_twitter_model/word2vec_twitter_model.bin');
var prompt = require('prompt');

const start = () => {
  w2v.loadModel(twitterFile, (err, model) => {
    if (err) console.log('Error! -', err);
    else {
      const getClosest = (phrase) => {
        return model.mostSimilar(phrase, 20);
      };

      process.stdout.write('Enter a word: ');
      process.stdin.on('data', function(data) {
        const word = data.toString().trim();
        console.log(getClosest(word));
        process.stdout.write('\nEnter a word: ');
      });
    }
  });
};

start();

//  Read codenames words into an iterable = filteredList
//  model = bigList.bin (already trained)
// filteredList.map ( word => {
//  return model.getVector(word)
// }
