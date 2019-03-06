const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  SprCar = sequelize.define('SprCar', {
  StartYear: {
    type: Sequelize.INTEGER,
  },
  finishYear: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  Code: {
    type: Sequelize.TEXT,
  },
  BrandFK:{
    type:Sequelize.INTEGER,
  },
  ModelFK:{
    type:Sequelize.INTEGER,
  }
});

module.exports = SprCar;
