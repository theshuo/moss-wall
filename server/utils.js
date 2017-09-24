const similarity = require('compute-cosine-similarity');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

// wordList: { yes: [], no: [], untried: [] }
const calculateAvgVector = (graph, vector) => {
  let aggVector = [];
  if (vector.length) {
    aggVector = vector
      .map((word) => {
        return graph.node(word).vector;
      })
      .reduce(vecAvg);
  }
  return aggVector;
};

const vecAvg = (va, vb) => {
  const avgVector = [ ...va ];
  for (let j = 0; j < vb.length; j++) {
    avgVector[j] += vb[j];
  }
  const mag = calcVectorMagnitude(avgVector);
  return avgVector.map((el) => {
    return el / mag;
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

const getClosestTopic = (graph, vector) => {
  let max = 0;
  let maxNode = '';
  const topicMatches = [];
  graph.nodes().forEach((nodeName) => {
    const curSim = similarity(vector, graph.node(nodeName).vector);
    if (curSim > max) {
      max = curSim;
      maxNode = nodeName;
      topicMatches.push({ name: nodeName, sim: max });
      // console.log(`best so far is ${maxNode} with ${max}`);
    }
  });
  return topicMatches;
};

module.exports = {
  getClosestTopic,
  getRandomInt,
  calculateAvgVector,
};
