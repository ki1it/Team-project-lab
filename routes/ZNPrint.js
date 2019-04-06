var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const ServiceList_Status = require('../database/models/ServiceList_Status')
const Car = require('../database/models/Car')
const SprCar = require('../database/models/SprCar')
const UrClient = require('../database/models/UrClient')
const Client = require('../database/models/Client')
const Brand = require('../database/models/Brand')
const Model = require('../database/models/Model')

/* GET home page. */
router.get('/',async function (req, res, next) {
  let servicelist = await ServiceList.findOne({
    // where:{ServiceListFK:req.query.id},
    //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
    include: [{model: Client, as: 'Client'},
      {model: UrClient, as: 'UrClient'},
      {model: Car, as: 'Car', include: [{ model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'}]},
      {model: ServiceList_Status, as: 'ServiceList_Status'},
    ],
    where:{id:req.query.id}
  })
      .catch((err) => {
        console.log(err)
      })
  res.render('ZNPrint', { servicelist: servicelist})
})

module.exports = router
