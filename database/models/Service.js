const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Service = sequelize.define('Service', {
  Name: {
    type: Sequelize.STRING(300),
  },
  FrequencyMarker:{
    type: Sequelize.BOOLEAN,
  },
  Type:{
    type: Sequelize.INTEGER,
  },
  Price:{
    type: Sequelize.INTEGER,
  }
});

module.exports = Service;
