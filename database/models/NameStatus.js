const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const NameStatus = sequelize.define('NameStatus', {
  Name: {
    type: Sequelize.STRING(500)
  },
  Code: {
    type: Sequelize.TEXT
  },
});

module.exports = NameStatus;
