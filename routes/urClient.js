

var express = require('express')
var router = express.Router()

const Client = require('../database/models/UrClient')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let client
    if (req.query.INN === undefined){
        client = await Client.findAll({
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        client = await Client.findAll({
            where:{INN :req.query.INN}
        })
            .catch((err) => {
                console.log(err)
            })
    }
    res.render('urClient', {
        client:client
    })
})

module.exports = router
