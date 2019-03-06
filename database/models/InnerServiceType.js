const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const InnerServiceType = sequelize.define('InnerServiceType', {
  Name: {
    type: Sequelize.STRING(300),
  }
});

module.exports = InnerServiceType;
