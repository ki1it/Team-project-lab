var express = require('express')
var router = express.Router()

const Breakdown = require('../database/models/Breakdown')
const BreakdownType = require('../database/models/BreakdownType')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let breakdown = await Breakdown.findAll({
        include: [{model: BreakdownType, as: 'BreakdownType'}]
    })
        .catch((err) => {
            console.log(err)
        })
    let breakdowntype = await BreakdownType.findAll({
    })
        .catch((err) => {
            console.log(err)
        })
    res.render('breakdown', {
        breakdown: breakdown,
        breakdowntype: breakdowntype
    })
})

module.exports = router
