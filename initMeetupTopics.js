require('./secrets');
const jsonfile = require('jsonfile');
const rp = require('request-promise');
const fs = require('fs');
const path = require('path');

const topicsFile = path.join(__dirname, '/data/topics.json');
const categoriesFile = path.join(__dirname, '/data/categories.json');

const meetupApiUrl = (endpoint) => {
  const meetup_root_url = `https://api.meetup.com/`;
  return `${meetup_root_url}${endpoint}`;
};

const getEndpoint = (endpoint) => {
  return {
    uri: meetupApiUrl(endpoint),
    qs: {
      key: process.env.MEETUP_API_KEY,
      sign: 'true',
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
};

let topics;
if (fs.existsSync(topicsFile)) {
  console.log(`Reading from ${topicsFile}`);
  topics = jsonfile.readFileSync(topicsFile);
} else {
  rp(getEndpoint('/topics')).then((res) => {
    const topics = res.results;
    const topicList = topics.map((topic) => {
      return {
        id: topic.id,
        urlkey: topic.urlkey,
        name: topic.name,
        members: topic.members,
      };
    });
    jsonfile.writeFile(topicsFile, topicList, function(err) {
      console.error(err);
    });
    console.log(`Wrote topics to ${topicsFile}`);
  });
}
