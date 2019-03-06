const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceList_Status = sequelize.define('ServiceList_Status', {
  Name: {
    type: Sequelize.STRING(500),
  }
});

module.exports = ServiceList_Status;
