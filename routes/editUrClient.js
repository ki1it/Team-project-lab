var express = require('express')
var router = express.Router()
const Client = require('../database/models/UrClient')
/* GET home page. */
router.get('/', async function (req, res, next) {
    let client = await Client.findAll({
        where: {INN: req.query.INN}
    })
        .catch((err) => {
            console.log(err)
        })

    res.render('editUrClient', {
        client: client,
        OldINN: req.query.INN
    })
})
module.exports = router
