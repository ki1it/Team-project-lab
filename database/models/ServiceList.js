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
  InnerStatus: {
    type: Sequelize.INTEGER,
  },
  ClientFK: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  UrClientFK: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  TypeOfPaymentFK: {
    type: Sequelize.INTEGER,
  },
  CarFK: {
    type: Sequelize.INTEGER,
  },
  OpenDate:{
    type: Sequelize.DATE
  },
  CloseDate:{
    type: Sequelize.DATE
  },
});

module.exports = ServiceList;
