

var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const Wagon = require('../database/models/Car')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {

  let tasks = await TaskWorker.findAll({
    where:{WorkerFK:req.query.id},
    include: [{ model: Task, include: [{ model: ServiceList, include: [{ model: Wagon,  as: 'Wagon' }],  as: 'ServiceList' }], as: 'Task' }]
  })
    .catch((err) => {
      console.log(err)
    })
  res.render('zadForWorker', {
    role:req.session.user.role,
    tasks:tasks
  })
})

module.exports = router
