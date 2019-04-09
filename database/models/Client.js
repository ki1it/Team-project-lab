const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Client = sequelize.define('Client', {
  FirstName: {
    type: Sequelize.STRING(300),
  },
  SecondName: {
    type: Sequelize.STRING(300),
  },
  Patronymic: {
    type: Sequelize.STRING(300),
    allowNull: true
  },
  Birthday:{
    type: Sequelize.DATE,
  },
  PhoneNumber: {
    type: Sequelize.TEXT,
  },
  DLNumber:{
    type: Sequelize.TEXT,
    unique: true
  },
  Adress:{
    type: Sequelize.TEXT,
  },
  Adress_fias:{
    type: Sequelize.TEXT,
  },
});

module.exports = Client;
