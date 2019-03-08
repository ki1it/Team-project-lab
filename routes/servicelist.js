var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
router.get('/', async function (req, res, next) {
  let servicelist = await ServiceList.findAll({
    // where:{ServiceListFK:req.query.id},
    // include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('servicelist', {
    servicelist: servicelist,
  })
})

module.exports = router
