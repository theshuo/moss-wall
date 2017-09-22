const path = require('path');
const w2v = require('word2vec');
const corpus = path.resolve(__dirname, './text8');
const target = path.resolve(__dirname, './vectors.txt');
const wordlist = path.resolve(__dirname, './vocab_filtered.txt');

const buildVectors = (input, output, vocab) => {
  w2v.word2vec(input, output, { minCount: 20, readVocab: vocab, saveVocab: path.resolve(__dirname, './vocab.txt') }, (res) => {
    console.log('Exit code:', res);
    // else console.log(model.mostSimilar(word, 20));
  });
};

buildVectors(corpus, target, wordlist);
