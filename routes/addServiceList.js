var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Client = require('../database/models/Client')
const Service = require('../database/models/Service')
const ServiceType = require('../database/models/ServiceType')
const Sequelize = require('sequelize')
const ServiceList_Status = require('../database/models/ServiceList_Status')
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

    let SLStatus = await ServiceList_Status.findAll({
    })
        .catch((err) => {
            console.log(err)
        })

  res.render('addServiceList', {
    SLStatus:SLStatus
  })
})

module.exports = router
