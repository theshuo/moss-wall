require('../../secrets');
const router = require('express').Router();
const { Topic } = require('../db/models');
const similarity = require('compute-cosine-similarity');
const rp = require('request-promise');
const { getClosestTopic, calculateAvgVector, getRandomInt } = require('../utils.js');
module.exports = router;

router.get('/', (req, res, next) => res.json({ moss: 'wall' }));

router.get('/topics', (req, res, next) => {
  Topic.findAll({ attributes: [ 'name' ] }).then((topics) => res.json(topics.map((topic) => topic.name))).catch(next);
});

router.post('/recommendations', (req, res, next) => {
  // req.body:  { yes: [], no: [], untried: [] }
  console.log(`Received ${req.body}`);
  const G = req.graph;
  const avgYes = calculateAvgVector(G, req.body.yes);
  const avgNo = calculateAvgVector(G, req.body.no);
  const avgUntried = calculateAvgVector(G, req.body.untried);
  const topicMatches = getClosestTopic(G, avgYes);
  // ^---- topicMatches.pop() gets you the closest
  const bestMatch = topicMatches[topicMatches.length - 1];
  console.log(topicMatches);
  // Do traversal here
  // {
  //  path:[{name, simToPrev},{name, simToPrev},{name:'', simToPrev:number}],
  //  event: {}
  // }
  const maxJumps = 5;
  const journey = { path: [], event: {} };
  let curTopic = bestMatch.name;
  journey.path.push({ name: curTopic, simtoPrev: 0 });

  for (let jump = 0; jump < maxJumps; jump++) {
    const edges = G.nodes()
      .map((node) => {
        return { to: node, sim: G.edge(curTopic, node) };
      })
      .sort((a, b) => {
        // sort most sim -> least sim
        return b.sim - a.sim;
      });
    const start = 0;
    const end = Math.floor(0.25 * edges.length - 1);
    const nextTopicIndex = getRandomInt(start, end);
    curTopic = edges[nextTopicIndex].to;
    journey.path.push({ name: curTopic, simtoPrev: edges[nextTopicIndex].sim });
  }
  console.log('journey:', journey);
  getMeetupEvents(G.node(curTopic).urlkey).then((eventResponse) => {
    const eventIndex = getRandomInt(0, eventResponse.results.length - 1);
    const randEvent = eventResponse.results[eventIndex];
    const event = { name: randEvent.name, venue: randEvent.venue };
    console.log(`Random event: ${JSON.stringify(event)}`);
    journey.event = event;
    res.json(journey);
  });
});

const getMeetupEvents = (targetTopic) => {
  console.log(`Trying to get events for: [${targetTopic}]`);
  const options = {
    uri: meetupApiUrl('/2/open_events'),
    qs: {
      key: process.env.MEETUP_API_KEY,
      sign: 'true',
      country: 'US',
      city: 'chicago',
      state: 'IL',
      topic: targetTopic,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  return rp(options);
};

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const meetupApiUrl = (endpoint) => {
  const meetup_root_url = `https://api.meetup.com/`;
  return `${meetup_root_url}${endpoint}`;
};
