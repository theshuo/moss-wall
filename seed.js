const fs = require('fs');
const path = require('path');
const db = require('./server/db');
const Promise = require('bluebird');
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

    topicPromises = topics.map((topic) => {
      const phrase = topic.name.replace(/-/g, ' ').replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').toLowerCase();
      return calcVector(phrase).then((vector) => {
        // console.log(`[${phrase}] vector: [${vector}]`);
        topic.vector = vector;
        return topic;
      });
    });

    Promise.all(topicPromises).then((topicsList) => {
      Topic.bulkCreate(
        topicsList.map((topic) => {
          return {
            name: topic.name.toLowerCase(),
            urlkey: topic.urlkey,
            vector: topic.vector,
          };
        }),
      ).then(() => {
        console.log('Done with Topics');
      });
    });
  } else {
    console.log(`${topicsFile} not found.`);
  }
};

const calcVector = (phrase) => {
  const words = phrase.split(' ');
  const wordInstances = words.map((word) => {
    return Word.findOne({
      where: {
        name: word,
      },
    });
  });

  return Promise.all(wordInstances).then((foundWords) => {
    foundWords.map((word) => {
      if (word) {
        console.log(`[${phrase}] found [${word.name}]`);
      } else {
        console.log(`[${phrase}] didnt  find`);
      }
    });
    // console.log(`[${phrase}]`);
    const avgVector = [ ...foundWords[0].vector ];
    for (let i = 1; i < foundWords.length; i++) {
      for (let j = 0; j < foundWords[i].vector.length; j++) {
        avgVector[j] += foundWords[i].vector[j];
      }
    }
    const mag = calcVectorMagnitude(avgVector);
    return avgVector.map((el) => {
      return el / mag;
    });
  });
};

const calcVectorMagnitude = (vector) => {
  return Math.sqrt(
    vector.reduce((a, b) => {
      return a + b * b;
    }),
    0,
  );
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
