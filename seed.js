const fs = require('fs');
const path = require('path');
const db = require('./server/db');
const { Word, Topic } = require('./server/db/models');
const jsonfile = require('jsonfile');
const chunkingStreams = require('chunking-streams');
const LineCounter = chunkingStreams.LineCounter;

const chunker = new LineCounter({
  numLines: 1000,
});

const nDims = 50;
const seedWords = () => {
  filePath = `/data/glove.6B/glove.6B.${nDims}d.txt`;
  fullPath = path.join(__dirname, filePath);
  const totalLines = 400000; // lines in 50d

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
      if (totalCreated % 10000 === 0) console.log(`${totalCreated / totalLines * 100}% done`);
    });
  });

  readableStream.on('error', (err) => {
    console.error(err);
  });

  readableStream.on('close', () => {
    console.log('Done');
  });
};

const randVector = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.random());
  }
  return arr;
};

const seedTopics = () => {
  const topicsFile = path.join(__dirname, '/data/topics.json');
  if (fs.existsSync(topicsFile)) {
    console.log(`Reading from ${topicsFile}`);
    topics = jsonfile.readFileSync(topicsFile);
    Topic.bulkCreate(
      topics.map((topic) => {
        const phrase = topic.name.replace(/-/g, ' ').replace(/\W+/g, ' ').toLowerCase();
        return {
          name: topic.name.toLowerCase(),
          urlkey: topic.urlkey,
          vector: calcVector(phrase),
        };
      }),
    );
  } else {
    console.log(`${topicsFile} not found.`);
  }
};

const calcVector = (phrase) => {
  const words = phrase.split(' ');
  words.reduce();
};

const seedDb = () => {
  console.log('dropping ur tables & syncing db---');
  db.sync({ force: false }).then(() => {
    console.log('seeding db');
    // seedWords();
    seedTopics();
  });
};

seedDb();
