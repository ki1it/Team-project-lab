const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceList = sequelize.define('ServiceList', {
  Date: {
    type: Sequelize.DATE,
  },
  Description:{
    type: Sequelize.STRING(3000),
  },
  Markup: {
    type: Sequelize.STRING(3000),
    allowNull: true
  },
  Status: {
    type: Sequelize.INTEGER,
  },
  ClientFK: {
    type: Sequelize.INTEGER,
  },
  WagonFK: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ServiceList;
