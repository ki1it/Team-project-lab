var express = require('express')
var router = express.Router()
const ServiceList = require('../database/models/ServiceList')
const ServiceList_Status = require('../database/models/ServiceList_Status')
const Car = require('../database/models/Car')
const UrClient = require('../database/models/UrClient')
const Client = require('../database/models/Client')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
router.get('/', async function (req, res, next) {
    let servicelist
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    if (req.query.searchid === undefined) {
        servicelist = await ServiceList.findAll({
            where: {
                OpenDate:
                    {
                        [Op.gte]: yesterday.setHours(0,0,0,0)
                    }
            },
            //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

            include: [{model: Client, as: 'Client'},
                {model: UrClient, as: 'UrClient'},
                {model: Car, as: 'Car'},
                {model: ServiceList_Status, as: 'ServiceList_Status'},
            ]
        })
            .catch((err) => {
                console.log(err)
            })
    } else {
        servicelist = await ServiceList.findAll({
            //where:{'Client.DLNumber':req.body.searchid},
            //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

            include: [{model: Client, where: {DLNumber: req.query.searchid}, as: 'Client'},
                {model: UrClient, as: 'UrClient'},
                {model: Car, as: 'Car'},
                {model: ServiceList_Status, as: 'ServiceList_Status'},
            ]
        })
            .catch((err) => {
                console.log(err)
            })
        if (servicelist === undefined) {
            servicelist = await ServiceList.findAll({
                //where:{Car.sequelize.literal('Car.VIN'):req.query.searchid},
                //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

                include: [{model: Client, as: 'Client'},
                    {model: UrClient, as: 'UrClient'},
                    {model: Car, where: {VIN: req.query.searchid}, as: 'Car'},
                    {model: ServiceList_Status, as: 'ServiceList_Status'},
                ]
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (servicelist === undefined) {
            servicelist = await ServiceList.findAll({
                //where:{Car.sequelize.literal('Car.VIN'):req.query.searchid},
                //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

                include: [{model: Client, as: 'Client'},
                    {model: UrClient, where: {INN: req.query.searchid}, as: 'UrClient'},
                    {model: Car, as: 'Car'},
                    {model: ServiceList_Status, as: 'ServiceList_Status'},
                ]
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (servicelist === undefined) {
            servicelist = await ServiceList.findAll({
                //where:{Car.sequelize.literal('Car.VIN'):req.query.searchid},
                //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

                include: [{model: Client, as: 'Client'},
                    {model: UrClient, as: 'UrClient'},
                    {model: Car, where: {GosNumber: req.query.searchid}, as: 'Car'},
                    {model: ServiceList_Status, as: 'ServiceList_Status'},
                ]
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (servicelist === undefined) {
            servicelist = await ServiceList.findAll({
                //where:{Car.sequelize.literal('Car.VIN'):req.query.searchid},
                //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

                include: [{model: Client, where: {SecondName: req.query.searchid}, as: 'Client'},
                    {model: UrClient, as: 'UrClient'},
                    {model: Car, as: 'Car'},
                    {model: ServiceList_Status, as: 'ServiceList_Status'},
                ]
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (servicelist === undefined) {
            servicelist = await ServiceList.findAll({
                //where:{Car.sequelize.literal('Car.VIN'):req.query.searchid},
                //include: [{ model: Breakdown, include: { model: BreakdownType, as: 'BreakdownType' },  as: 'Breakdown' }]

                include: [{model: Client,  as: 'Client'},
                    {model: UrClient,where: {Name: req.query.searchid}, as: 'UrClient'},
                    {model: Car, as: 'Car'},
                    {model: ServiceList_Status, as: 'ServiceList_Status'},
                ]
            })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    res.render('servicelist', {
        servicelist: servicelist,
    })
})

module.exports = router
