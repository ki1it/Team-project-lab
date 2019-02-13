const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Wagon = sequelize.define('Wagon', {
  Brand: {
    type: Sequelize.STRING(300),
  },
  Model: {
    type: Sequelize.STRING(300),
  },
  Capacity: {
    type: Sequelize.STRING(300),
  },
  Type: {
    type: Sequelize.STRING(300),
  },
  Weight: {
    type: Sequelize.INTEGER,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Wagon;
