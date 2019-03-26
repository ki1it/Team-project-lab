var express = require('express')
var router = express.Router()

const Service = require('../database/models/Service')
const ServiceType = require('../database/models/ServiceType')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let servicetype = await ServiceType.findAll({})
        .catch((err) => {
            console.log(err)
        })
    let service = await Service.findAll({
        include: [{model: ServiceType, as: 'ServiceType'}]
    })
        .catch((err) => {
            console.log(err)
        })
    res.render('service', {
        service: service,
        servicetype: servicetype
    })
})

module.exports = router
