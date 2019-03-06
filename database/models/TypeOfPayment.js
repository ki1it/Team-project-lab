const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const TypeOfPayment = sequelize.define('TypeOfPayment', {
  Name: {
    type: Sequelize.STRING(500)
  },
  Code: {
    type: Sequelize.TEXT
  },
});

module.exports = TypeOfPayment;
