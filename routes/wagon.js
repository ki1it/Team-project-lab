var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Wagon = require('../database/models/Car')

const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let wagon = await ServiceList.findAll({
    include: [{ model: Wagon, as: 'Wagon' },{ model: StatusOfServiceList, as: 'StatusOfServiceList' },{ model: Client, as: 'Client' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('wagon', {
    wagons:wagon
  })
})

module.exports = router
