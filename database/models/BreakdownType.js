const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const BreakdownType = sequelize.define('BreakdownType', {
  Name: {
    type: Sequelize.STRING(500),
  }
});

module.exports = BreakdownType;
