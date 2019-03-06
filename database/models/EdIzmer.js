const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const EdIzmer = sequelize.define('EdIzmer', {
  Name: {
    type: Sequelize.STRING(500)
  },
  CodeOKEI: {
    type: Sequelize.TEXT
  },
  Code: {
    type: Sequelize.TEXT
  },
});

module.exports = EdIzmer;
