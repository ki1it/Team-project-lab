const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  Brand = sequelize.define('Brand', {
  Brand: {
    type: Sequelize.TEXT,
  },
  Code: {
    type: Sequelize.TEXT,
  },
});

module.exports = Brand;
