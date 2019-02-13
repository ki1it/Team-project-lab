const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const NameType = sequelize.define('NameType', {
  Name: {
    type: Sequelize.STRING(500)
  },
});

module.exports = NameType;
