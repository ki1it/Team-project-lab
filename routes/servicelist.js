var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Car = require('../database/models/Car')
const UrClient = require('../database/models/UrClient')
const Client = require('../database/models/Client')
router.get('/', async function (req, res, next) {
  let servicelist = await ServiceList.findAll({
    // where:{ServiceListFK:req.query.id},
    //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
    include: [{model: Client, as: 'Client'},
      {model: UrClient, as: 'UrClient'},
      {model: Car, as: 'Car'}]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('servicelist', {
    servicelist: servicelist,
  })
})

module.exports = router
