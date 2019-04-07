const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Detail = sequelize.define('Detail', {
  Name: {
    type: Sequelize.STRING(500)
  },
  Amount: {
    type: Sequelize.INTEGER
  },
  Price:{
  type: Sequelize.INTEGER,
},
  EdIzmerFK:{
    type: Sequelize.INTEGER,
  },
  Price:{
    type: Sequelize.INTEGER,
  },
  Code:{
    type: Sequelize.TEXT,
    unique:true
  },
});

module.exports = Detail;
