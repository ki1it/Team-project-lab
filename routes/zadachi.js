var express = require('express')
var router = express.Router()
const Task = require('../database/models/Task')
const TaskStatus = require('../database/models/TaskStatus')
const TaskWorker = require('../database/models/TaskWorker')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let zadacha = await Task.findAll({
    where:{ServiceListFK:req.query.id},
    include: [{ model: TaskStatus,  as: 'TaskStatus' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('zadachi', {
    usluga:zadacha
  })
})

module.exports = router
