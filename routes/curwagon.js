var express = require('express')
var router = express.Router()
const Wagon = require('../database/models/Car')

const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let wagon = await Wagon.findOne({
    where:{id:req.query.id}
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('curwagon', {
    wagon:wagon
  })
})

module.exports = router
