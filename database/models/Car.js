const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  Car = sequelize.define('Car', {
  VIN: {
    type: Sequelize.TEXT,
    unique: true
  },
  SprCarFK: {
    type: Sequelize.INTEGER,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
  OwnerFK:{
    type: Sequelize.INTEGER,
  },
  OwnerUrFK:{
    type: Sequelize.INTEGER,
  },
  GosNumber: {
    type: Sequelize.TEXT,
  },
  EngineNumber: {
    type: Sequelize.TEXT,
  },
});

module.exports = Car;
