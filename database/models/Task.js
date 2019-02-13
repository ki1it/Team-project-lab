const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Task = sequelize.define('Task', {
  Text: {
    type: Sequelize.STRING(3000),
  },
  Date:{
    type: Sequelize.DATE,
  },
  Status: {
    type: Sequelize.INTEGER,
  },
  ServiceListFK: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Task;
