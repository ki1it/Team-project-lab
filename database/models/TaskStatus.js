const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const TaskStatus = sequelize.define('TaskStatus', {
  Name: {
    type: Sequelize.STRING(300),
  },
});

module.exports = TaskStatus;
