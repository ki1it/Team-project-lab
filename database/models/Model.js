const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  Model = sequelize.define('Model', {
  Model: {
    type: Sequelize.TEXT,
  },
  Code: {
    type: Sequelize.TEXT,
  },
});

module.exports = Model;
