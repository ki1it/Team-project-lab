var express = require('express')
var router = express.Router()
const ServiceList_Service = require('../database/models/ServiceList_Service')
const Service = require('../database/models/Service')
const ServiceType = require('../database/models/ServiceType')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let usluga = await ServiceList_Service.findAll({
    where:{ServiceListFK:req.query.id},
    include: [{ model: Service, include: { model: ServiceType, as: 'ServiceType' },  as: 'Service' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('uslugi', {
    usluga:usluga
  })
})

module.exports = router
