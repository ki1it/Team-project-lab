const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  worker_id:{
    type: Sequelize.INTEGER,
    unique: true
  }
})

module.exports = User;
