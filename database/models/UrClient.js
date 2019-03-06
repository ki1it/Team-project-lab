const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const UrClient = sequelize.define('UrClient', {
  Name: {
    type: Sequelize.STRING(300),
  },
  INN:{
    type: Sequelize.INTEGER,
  },
  PhoneNumber: {
    type: Sequelize.STRING(12),
  },
  Adress:{
    type: Sequelize.TEXT,
  }
});

module.exports = UrClient;
