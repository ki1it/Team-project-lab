const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Breakdown = sequelize.define('Breakdown', {
  Name: {
    type: Sequelize.STRING(300),
  },
  FrequencyMarker:{
    type: Sequelize.BOOLEAN,
  },
  Type:{
    type: Sequelize.INTEGER,
  }
});

module.exports = Breakdown;
