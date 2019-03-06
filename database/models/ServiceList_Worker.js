const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const ServiceList_Service = sequelize.define('ServiceList_Worker', {
  ServiceListFK:{
    type: Sequelize.INTEGER,
  },
  WorkerFK:{
    type: Sequelize.INTEGER,
  }
});

module.exports = ServiceList_Worker;
