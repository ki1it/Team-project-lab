const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const NameOfGood = sequelize.define('NameOfGood', {
  Name: {
    type: Sequelize.STRING(500)
  },
  Amount: {
    type: Sequelize.INTEGER
  },
  Type: {
    type: Sequelize.INTEGER
  },
  Status: {
    type: Sequelize.INTEGER
  },
  Price:{
  type: Sequelize.INTEGER,
},
  EdIzmerFK:{
    type: Sequelize.INTEGER,
  }
});

module.exports = NameOfGood;
