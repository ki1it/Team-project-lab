

var express = require('express')
var router = express.Router()
const Worker = require('../database/models/Worker')
const Position = require('../database/models/Position')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let clients = await Worker.findAll({
    include: [{ model: Position,  as: 'Position' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('workers', {
    clients:clients
  })
})

module.exports = router
