const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
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
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;
