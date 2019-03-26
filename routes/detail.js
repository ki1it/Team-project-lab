

var express = require('express')
var router = express.Router()

const Detail = require('../database/models/Detail')
const EdIzmer = require('../database/models/EdIzmer')
const Sequelize = require('sequelize')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let detail= await Detail.findAll({
        include: [{model: EdIzmer, as: 'EdIzmer'}]
    })
        .catch((err) => {
            console.log(err)
        })
    res.render('detail', {
        detail:detail
    })
})

module.exports = router
