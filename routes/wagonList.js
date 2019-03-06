var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Wagon = require('../database/models/Car')
const StatusOfServiceList = require('../database/models/StatusOfServiceList')
const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let wagon = await Wagon.findAll({
      })
    .catch((err) => {
      console.log(err)
    })
  res.render('wagonList', {
    wagons:wagon
  })
})

module.exports = router
