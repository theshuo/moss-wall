const db = require('./db');
const Graph = require('graphlib').Graph;
const similarity = require('compute-cosine-similarity');
const { Word, Topic } = require('./db/models');

const G = new Graph({ directed: false });

Topic.findAll()
  .then((allTopics) => {
    allTopics.map((topic) => {
      G.setNode(topic.name, topic.toJSON());
    });
  })
  .then(() => {
    const nodes = G.nodes();
    // const N = nodes.length;
    const N = 3;
    for (let i = 0; i < N; i++) {
      const sourceNode = nodes[i];
      for (let j = 0; j < N; j++) {
        if (i != j) {
          const targetNode = nodes[j];
          const edgeSim = similarity(G.node(sourceNode).vector, G.node(targetNode).vector);
          console.log(`${sourceNode} to ${targetNode} is ${edgeSim}`);
          G.setEdge(sourceNode, targetNode, edgeSim);
        }
      }
    }
    console.log(`Built Topic graph with:\n Nodes:${G.nodeCount()}, Edges:${G.edgeCount()}`);
  });
