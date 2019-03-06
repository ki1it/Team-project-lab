var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Wagon = require('../database/models/Car')
const StatusOfServiceList = require('../database/models/StatusOfServiceList')
const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let serviceList = await ServiceList.findAll({
    include: [{ model: Wagon, as: 'Wagon' },{ model: StatusOfServiceList, as: 'StatusOfServiceList' },{ model: Client, as: 'Client' }]
  })
    .catch((err) => {
      console.log(err)
    })
  let listOfStatus = await StatusOfServiceList.findAll()
  let wagonList = await Wagon.findAll()
  let clientList = await Client.findAll()
  res.render('workOrderList', {
    serviceList: serviceList,
    listOfStatus: listOfStatus,
    wagonList: wagonList,
    clientList: clientList
  })
})

module.exports = router
