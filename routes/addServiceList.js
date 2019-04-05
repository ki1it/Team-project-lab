var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Car = require('../database/models/Car')
const Client = require('../database/models/Client')
const UrClient = require('../database/models/UrClient')
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

    let serviceList

    if (req.query.ID == "")
        serviceList  = await ServiceList.create({
            include:[{model: ServiceList_Status , as: 'ServiceList_Status '},
                    {model: Client, as: 'Client'},
                    {model: UrClient, as: 'UrClient'},
                    {model: Car, as: 'Car'}]
        })
            .catch((err) => {
                console.log(err)
            })
    else
        serviceList = await ServiceList.findOne({
            where: {id: req.query.ID},
            include:[{model: ServiceList_Status , as: 'ServiceList_Status '}]
        })
            .catch((err) => {
                console.log(err)
            });

    let SLStatus = await ServiceList_Status.findAll({
    })
        .catch((err) => {
            console.log(err)
        })

  res.render('addServiceList', {
      serviceList:serviceList,
      SLStatus:SLStatus
  })
})

module.exports = router
