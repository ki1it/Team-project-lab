var express = require('express')
var router = express.Router()
const ServiceListBreakdown = require('../database/models/ServiceListBreakdown')
const Breakdown = require('../database/models/Breakdown')
const BreakdownType = require('../database/models/BreakdownType')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let polomka = await ServiceListBreakdown.findAll({
    where:{ServiceListFK:req.query.id},
    include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('polomki', {
    usluga:polomka
  })
})

module.exports = router
