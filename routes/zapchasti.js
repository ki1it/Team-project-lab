var express = require('express')
var router = express.Router()
const WorkOrderName = require('../database/models/WorkOrderName')
const NameOfGood = require('../database/models/NameOfGood')
const NameType = require('../database/models/NameType')
const NameStatus = require('../database/models/NameStatus')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let zapchast = await WorkOrderName.findAll({
    where:{ServiceListFK:req.query.id},
    include: [{ model: NameOfGood, include: [{ model: NameType, as: 'NameType' },{ model: NameStatus, as: 'NameStatus' }],  as: 'NameOfGood' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('zapchasti', {
    usluga:zapchast
  })
})

module.exports = router
