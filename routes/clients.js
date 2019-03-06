

var express = require('express')
var router = express.Router()
const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let clients = await Client.findAll({
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('clients', {
    clients:clients
  })
})

module.exports = router
