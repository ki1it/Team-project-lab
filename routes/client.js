

var express = require('express')
var router = express.Router()

const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let client = await Client.findAll({

  })
    .catch((err) => {
      console.log(err)
    })
  res.render('client', {
    client:client
  })
})

module.exports = router
