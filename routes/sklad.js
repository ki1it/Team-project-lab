

var express = require('express')
var router = express.Router()
const WorkOrderName = require('../database/models/WorkOrderName')
const NameOfGood = require('../database/models/NameOfGood')
const NameType = require('../database/models/NameType')
const NameStatus = require('../database/models/NameStatus')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let skladList = await NameType.findAll()
    .catch((err) => {
      console.log(err)
    })
  let sklad = await NameOfGood.findAll({
    include: [{ model: NameType,  as: 'NameType' },{ model: NameStatus, as: 'NameStatus' }],
  })
    .catch((err) => {
      console.log(err)
    })
  let types = await NameType.findAll( {
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('sklad', {
    skladList: skladList,
    role:req.session.user.role,
    sklad: sklad,
    types: types
  })
  })

module.exports = router
