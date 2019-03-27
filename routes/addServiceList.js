var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Client = require('../database/models/Client')
const Service = require('../database/models/Service')
const ServiceType = require('../database/models/ServiceType')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  // let clients = await Client.findAll({
  //
  // })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // let clientlist = []
  // for (let i = 0; i<clients.length;i++) {
  //   clientlist.push(clients[i].dataValues.FirstName + ' ' + clients[i].dataValues.SecondName + ' ' + clients[i].dataValues.DLNumber)
  // }
  res.render('addServiceList', {

  })
})

module.exports = router
