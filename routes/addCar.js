var express = require('express')
var router = express.Router()
const Car = require('../database/models/Car')
const Brand = require('../database/models/Brand')
const Model = require('../database/models/Model')
const SprCar = require('../database/models/SprCar')
const UrClient = require('../database/models/UrClient')
const Client = require('../database/models/Client')
/* GET home page. */
router.get('/', async function (req, res, next) {
    let car = await Car.findOne({
        // where:{ServiceListFK:req.query.id},
        include: [{ model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'},
            {model: Client, as: 'Client'},
            {model: UrClient, as: 'UrClient'}],
        where:{id :req.query.ID}
    })
        .catch((err) => {
            console.log(err)
        })



    res.render('addCar', {
        car: car
    })
})

module.exports = router
