const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceType = sequelize.define('ServiceType', {
  Name: {
    type: Sequelize.STRING(300),
  }
});

module.exports = ServiceType;
