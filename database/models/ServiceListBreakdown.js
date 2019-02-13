const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceListBreakdown = sequelize.define('ServiceListBreakdown', {
  NumOfService: {
    type: Sequelize.INTEGER,
  },
  ServiceListFK:{
    type: Sequelize.INTEGER,
  },
  ServiceListBr:{
    type: Sequelize.INTEGER,
  }
});

module.exports = ServiceListBreakdown;
