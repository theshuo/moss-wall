const Sequelize = require('sequelize');
const db = require('../db');

const TopicSimilarity = db.define('topic', {
  similarity: {
    type: Sequelize.DOUBLE,
  },
});

/**
 * instanceMethods
 */

/**
 * classMethods
 */

module.exports = TopicSimilarity;
