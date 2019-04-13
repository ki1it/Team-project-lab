var express = require('express')
var router = express.Router()
var moment = require('moment');
const ServiceList = require('../database/models/ServiceList')
const Car = require('../database/models/Car')
const Client = require('../database/models/Client')
const UrClient = require('../database/models/UrClient')
const Service = require('../database/models/Service')
const ServiceType = require('../database/models/ServiceType')
const Sequelize = require('sequelize')
const ServiceList_Status = require('../database/models/ServiceList_Status')
const ServiceList_Service = require('../database/models/ServiceList_Service')
const Breakdown = require('../database/models/Breakdown')
const ServiceListBreakdown = require('../database/models/ServiceListBreakdown')
const Detail = require('../database/models/Detail')
const ServiceList_Detail = require('../database/models/ServiceList_Detail')

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

    if (req.query.ID === "") {
        serviceList = await ServiceList.create({
            Status: 4,
            OpenDate: moment().format()
        })
            .catch((err) => {
                console.log(err)
            })
        let id = serviceList.dataValues.id
        serviceList = await ServiceList.findOne({

            include: [{model: ServiceList_Status, as: 'ServiceList_Status'},
                {model: Client, as: 'Client'},
                {model: UrClient, as: 'UrClient'},
                {model: Car, as: 'Car'}],
            where: {id: id}
        })
            .catch((err) => {
                console.log(err)
            })

    }
    else {
        serviceList = await ServiceList.findOne({

            include: [{model: ServiceList_Status, as: 'ServiceList_Status'},
                {model: Client, as: 'Client'},
                {model: UrClient, as: 'UrClient'},
                {model: Car, as: 'Car'}],
            where: {id: req.query.ID}
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let SLStatus = await ServiceList_Status.findAll({
    })
        .catch((err) => {
            console.log(err)
        })



    let serviceList_Service = await ServiceList_Service.findAll({
        include: [{model: Service, as: 'Service'}],
        where: {ServiceListFK: req.query.ID}
    })
        .catch((err) => {
            console.log(err)
        })

    let serviceListBreakdown = await ServiceListBreakdown.findAll({
        include: [{model: Breakdown, as: 'Breakdown'}],
        where: {ServiceListFK: req.query.ID}
    })
        .catch((err) => {
            console.log(err)
        })

    let serviceList_Detail = await ServiceList_Detail.findAll({
        include: [{model: Detail, as: 'Detail'}],
        where: {ServiceListFK: req.query.ID}
    })
        .catch((err) => {
            console.log(err)
        })


    res.render('addServiceList', {
        ID:req.query.ID,
      serviceList:serviceList,
      SLStatus:SLStatus,
      serviceList_Service:serviceList_Service,
      serviceListBreakdown:serviceListBreakdown,
      serviceList_Detail:serviceList_Detail
  })
})

module.exports = router
