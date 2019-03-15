var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Brand = require('../database/models/Brand')
const Model = require('../database/models/Model')
const SprCar = require('../database/models/SprCar')
router.get('/', async function (req, res, next) {
  let car = await car.findAll({
    // where:{ServiceListFK:req.query.id},
    // include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('car', {
    car: car,
  })
})

module.exports = router
