const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  urlkey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vector: {
    type: Sequelize.ARRAY({ type: Sequelize.DOUBLE }),
  },
});

/**
 * instanceMethods
 */

/**
 * classMethods
 */

module.exports = Topic;
