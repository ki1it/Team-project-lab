var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Brand = require('../database/models/Brand')
const Model = require('../database/models/Model')
const SprCar = require('../database/models/SprCar')
router.get('/', async function (req, res, next) {
  let car = await Car.findAll({
    // where:{ServiceListFK:req.query.id},
     include: [{ model: SprCar, include: [{ model: Brand, as: 'Brand' },{ model: Model, as: 'Model' }],  as: 'SprCar' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('car', {
    car: car,
  })
})

module.exports = router
