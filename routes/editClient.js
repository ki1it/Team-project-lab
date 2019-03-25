var express = require('express')
var router = express.Router()
const Client = require('../database/models/Client')
/* GET home page. */
router.get('/', async function (req, res, next) {
    let client = await Client.findAll({
        where: {DLNumber: req.query.DLN}
    })
        .catch((err) => {
            console.log(err)
        })

res.render('editClient', {
    client: client,
    OldDLN: req.query.DLN
})
})
module.exports = router
