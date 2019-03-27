

var express = require('express')
var router = express.Router()

const Client = require('../database/models/Client')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let client
  if (req.query.DLN === undefined){
    client = await Client.findAll({
        limit: 30
    })
        .catch((err) => {
          console.log(err)
        })
  }
  else {
    client = await Client.findAll({
      where:{DLNumber :req.query.DLN}
    })
        .catch((err) => {
          console.log(err)
        })
  }
  res.render('client', {
    client:client
  })
})

module.exports = router
