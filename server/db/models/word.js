const Sequelize = require('sequelize');
const db = require('../db');

const Word = db.define('word', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  vector: {
    type: Sequelize.ARRAY({ type: Sequelize.DOUBLE }),
    allowNull: false,
  },
});

module.exports = Word;
