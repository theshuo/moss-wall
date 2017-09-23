const fs = require('fs');
const path = require('path');
const db = require('./server/db');
const { Word } = require('./server/db/models');
const jsonfile = require('jsonfile');
const chunkingStreams = require('chunking-streams');
const LineCounter = chunkingStreams.LineCounter;

const chunker = new LineCounter({
  numLines: 1000,
});

const seed = () => {
  fullPath = path.join(__dirname, '/glove.twitter.27B/glove.twitter.27B.25d.txt');

  console.log(`Seeding db from ${fullPath}`);
  const readableStream = fs.createReadStream(fullPath);
  // readableStream.setEncoding('utf8');

  readableStream.pipe(chunker);
  let totalCreated = 0;

  chunker.on('data', (chunk) => {
    chunk = chunk.toString('utf-8').split('\n');
    chunk.pop();
    const wordList = chunk.map((line, idx, arr) => {
      line = line.split(' ');
      return { name: line[0], vector: line.slice(1) };
    });
    Word.bulkCreate(wordList).then((createdWords) => {
      totalCreated += createdWords.length;
      if (totalCreated % 100000 === 0) console.log('created words:', totalCreated);
    });
  });

  readableStream.on('error', (err) => {
    console.error(err);
  });

  readableStream.on('close', () => {
    console.log('Done');
  });
};

const seedDb = () => {
  console.log('syncing db---');
  db.sync({ force: true }).then(() => {
    console.log('seeding db');
    seed();
  });
  // .then(() => {
  //   db.close();
  //   return null;
  // });
};
seedDb();
