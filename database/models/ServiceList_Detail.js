const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Servicelist_Detail = sequelize.define('Servicelist_Detail', {
  Amount: {
    type: Sequelize.INTEGER
  },
  ServiceListFK:{
    type: Sequelize.INTEGER,
  },
  NameOfGoodFK:{
    type: Sequelize.INTEGER,
  }
});

module.exports = Servicelist_Detail;
