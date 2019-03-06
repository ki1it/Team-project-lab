const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceList_Service = sequelize.define('ServiceList_Service', {
  NumOfService:{
    type: Sequelize.INTEGER,
  },
  ServiceListFK:{
    type: Sequelize.INTEGER,
  },
  ServiceFK:{
    type: Sequelize.INTEGER,
  }
});

module.exports = ServiceList_Service;
