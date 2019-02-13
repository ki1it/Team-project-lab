const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const StatusOfServiceList = sequelize.define('StatusOfServiceList', {
  Name: {
    type: Sequelize.STRING(500),
  }
});

module.exports = StatusOfServiceList;
