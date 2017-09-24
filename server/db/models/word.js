const Sequelize = require('sequelize');
const db = require('../db');
const similarity = require('compute-cosine-similarity');

const Word = db.define('word', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vector: {
    type: Sequelize.ARRAY({ type: Sequelize.DOUBLE }),
    allowNull: false,
  },
});

/**
 * instanceMethods
 */
Word.prototype.findSimilar = function(n) {};

/**
 * classMethods
 */

module.exports = Word;
