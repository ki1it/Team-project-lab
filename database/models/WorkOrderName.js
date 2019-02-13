const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const WorkOrderName = sequelize.define('WorkOrderName', {
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

module.exports = WorkOrderName;
