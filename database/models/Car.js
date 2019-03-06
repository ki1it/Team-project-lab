const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  Car = sequelize.define('Car', {
  VIN: {
    type: Sequelize.TEXT,
  },
  SprCarFK: {
    type: Sequelize.INTEGER,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
  OwnerFK:{
    type: Sequelize.INTEGER,
  }
});

module.exports = Car;
