const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Worker = sequelize.define('Worker', {
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
  PositionFK: {
    type:   Sequelize.INTEGER,
  }
});

module.exports = Worker;
