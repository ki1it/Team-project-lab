var express = require('express')
var router = express.Router()

router.get('/', async function (req, res, next) {
  // let polomka = await ServiceListBreakdown.findAll({
  //   where:{ServiceListFK:req.query.id},
  //   include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]
  // })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  res.render('servicelist', {

  })
})

module.exports = router
