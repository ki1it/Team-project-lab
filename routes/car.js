var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Brand = require('../database/models/Brand')
const Model = require('../database/models/Model')
const SprCar = require('../database/models/SprCar')
const UrClient = require('../database/models/UrClient')
const Client = require('../database/models/Client')
router.get('/', async function (req, res, next) {
  let car
  if (req.query.GosN === undefined) {
      car = await Car.findAll({
          // where:{ServiceListFK:req.query.id},
          include: [{ model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'},
              {model: Client, as: 'Client'},
              {model: UrClient, as: 'UrClient'}]
      })
          .catch((err) => {
              console.log(err)
          })
  }
  else{
      car = await Car.findAll({
          // where:{ServiceListFK:req.query.id},
          include: [{ model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'},
              {model: Client, as: 'Client'},
              {model: UrClient, as: 'UrClient'}],
          where:{GosNumber :req.query.GosN}
      })
          .catch((err) => {
              console.log(err)
          })
  }



  res.render('car', {

    car: car
  })
})

module.exports = router
