const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const TaskWorker = sequelize.define('TaskWorker', {
  AmountOfWorkers: {
    type: Sequelize.INTEGER,
  },
  WorkerFK: {
    type: Sequelize.INTEGER,
  },
  TaskFK: {
    type: Sequelize.INTEGER,
  }
});

module.exports = TaskWorker;
