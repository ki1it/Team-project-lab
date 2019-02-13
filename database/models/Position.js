const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Position = sequelize.define('Position', {
  Name: {
    type: Sequelize.STRING(300),
  },
});

module.exports = Position;
