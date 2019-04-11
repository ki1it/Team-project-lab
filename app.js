var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');

require('./database/lib/dbInit')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addServiceListRouter = require('./routes/addServiceList')
var servicelistRouter = require('./routes/servicelist')
var clientRouter = require('./routes/client')
var workersRouter = require('./routes/workers')
var aboutRouter = require('./routes/about')
var carRouter = require('./routes/car')
var editClientRouter = require('./routes/editClient')
var editUrClientRouter = require('./routes/editUrClient')
var urClientRouter = require('./routes/urClient')
var breakdownRouter= require('./routes/breakdown')
var serviceRouter = require('./routes/service')
var detailRouter = require('./routes/detail')
var ZNRouter = require('./routes/ZNPrint')
var addCarRouter = require('./routes/addCar')
var app = express();
//auth part
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./database/models/User');
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({extended: true}));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect(req.originalUrl);
    } else {
        next();
    }
};
//end of auth part


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
})
// route for user signup
app.route('/signup')
    .get((req, res) => {
        res.render(__dirname + '/views/signup.pug');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            worker_id: req.body.wid
        })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/signup');
            })
            .catch(error => {
                res.redirect('/signup');
            });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render(__dirname + '/views/login.pug');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({where: {username: username}}).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (user.dataValues.password!==password) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                if (user.dataValues.role === 'admin') {
                    res.redirect('/signup')
                }
                if (user.dataValues.role === 'administrator') {
                    res.redirect('/index')
                }
                // if (user.dataValues.role === 'worker') {
                //     res.redirect('/zadForWorker?id=' + user.dataValues.worker_id)
                // }
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
app.use('/index', indexRouter)
app.use('/users', usersRouter)
app.use('/addservicelist', addServiceListRouter)
app.use('/servicelist', servicelistRouter)
app.use('/client', clientRouter)
app.use('/workers', workersRouter)
app.use('/about', aboutRouter)
app.use('/car', carRouter )
app.use('/editClient', editClientRouter )
app.use('/editUrClient', editUrClientRouter )
app.use('/urclient', urClientRouter)
app.use('/breakdown', breakdownRouter)
app.use('/service', serviceRouter)
app.use('/detail', detailRouter)
app.use('/ZN', ZNRouter)
app.use('/addCar', addCarRouter)

const Client = require('./database/models/Client')
const Car = require('./database/models/Car')
const SprCar = require('./database/models/SprCar')
const Brand = require('./database/models/Brand')
const Model = require('./database/models/Model')
const ServiceList = require('./database/models/ServiceList')
const UrClient = require('./database/models/UrClient')
const Breakdown = require('./database/models/Breakdown')
const BreakdownType = require('./database/models/BreakdownType')
const Service = require('./database/models/Service')
const ServiceType = require('./database/models/ServiceType')
const Detail = require('./database/models/Detail')
const EdIzmer = require('./database/models/EdIzmer')
const ServiceList_Status = require('./database/models/ServiceList_Status')
const ServiceList_Service = require('./database/models/ServiceList_Service')
const ServiceListBreakdown = require('./database/models/ServiceListBreakdown')
const ServiceList_Detail = require('./database/models/ServiceList_Detail')

//WORK WITH CLIENT
app.use('/updateClient', async function (req, res) {
    await Client.update({
            FirstName: req.body.inputName,
            SecondName: req.body.inputSecondName,
            Patronymic: req.body.inputPatronymic,
            PhoneNumber: req.body.inputPhoneNumber,
            Adress: req.body.inputAdress,
            DLNumber: req.body.inputDLN,
            Birthday: moment(req.body.inputBD, 'DD.MM.YYYY').startOf('day')
        }, {where: {DLNumber: req.query.OldDLN}}
    )
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/client')
})
app.use('/addClient', async function (req, res) {
    let cl = await Client.create({
        FirstName: req.body.inputName,
        SecondName: req.body.inputSecondName,
        Patronymic: req.body.inputPatronymic,
        PhoneNumber: req.body.inputPhoneNumber,
        Adress_fias: req.body.inputAdress,
        Adress: req.body.address,
        DLNumber: req.body.inputDLN,
        Birthday: moment(req.body.inputBD, 'DD.MM.YYYY').startOf('day')
    })
        .catch((err) => {
            console.log(err)
        })



    if (req.query.SLID === undefined) {
        res.redirect(req.headers.referer)
    }
    else {
        let sl = await ServiceList.update({
            ClientFK: cl.dataValues.id
        }, {where: {id: req.query.SLID}})
            .catch((err) => {
                console.log(err)
            })
        res.redirect('/addservicelist?ID=' + req.query.SLID)
    }

})


app.use('/checkClient', async function (req, res) {
    let cl = await Client.findOne({
        where: {DLNumber: req.query.DLN}
    })
        .catch((err) => {
            console.log(err)
        })
    let result
    if (cl === null || cl == undefined)
        result = 'Клиент не найден'
    else
        result = 'Клиент найден, ' + cl.dataValues.FirstName
    res.end(result)
})

app.use('/checkUrClient', async function (req, res) {
    let cl = await UrClient.findOne({
        where: {INN: req.query.INN}
    })
        .catch((err) => {
            console.log(err)
        })
    let result
    if (cl === null || cl == undefined)
        result = 'Клиент не найден'
    else
        result = 'Клиент найден, ' + cl.dataValues.Name
    res.end(result)
})

app.use('/delclient', async function (req, res) {
    await Client.destroy({
        where: {
            DLNumber: req.body.DLN
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})




//WORK WITH URCLIENT

app.use('/updateUrClient', async function (req, res) {
    await UrClient.update({
            Name: req.body.inputName,
            INN: req.body.inputINN,
            PhoneNumber: req.body.inputPhoneNumber,
            Adress:req.body.inputAdress
        },{where:{INN: req.query.OldINN}}
    )
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/urclient')
})

app.use('/delurclient', async function (req, res) {
    await UrClient.destroy({
        where: {
            INN: req.body.INN
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})

app.use('/addUrClient', async function (req, res) {
    let cl = await UrClient.create({
        Name: req.body.inputName,
        INN: req.body.inputINN,
        PhoneNumber: req.body.inputPhoneNumber,
        Adress: req.body.inputAdress
    })
        .catch((err) => {
            console.log(err)
        })
    if (req.query.SLID === undefined)
        res.redirect(req.headers.referer)
    else {
        let sl = await ServiceList.update({
            UrClientFK: cl.dataValues.id
        }, {where: {id: req.query.SLID}})
            .catch((err) => {
                console.log(err)
            })
        res.redirect('/addservicelist?ID=' + req.query.SLID)
    }
})


//WORK WITH SERVICELIST

app.use('/closeSL', async function (req, res) {
    await ServiceList.update({
            Status: 2,
            CloseDate: moment().format()
        }, {where: {id: req.body.id}}
    )
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/servicelist')
})

app.use('/addSL', async function (req, res) {

    let status

    if(req.body.inputStatus !== "") {
        let SLstatus = await ServiceList_Status.findOne({
            where: {Name: req.body.inputStatus}
        })
            .catch((err) => {
                console.log(err)
            })
        status = SLstatus.dataValues.id
    }
    else
        status = null

    let car
    if (req.body.inputCar!=="") {
        let carr = await Car.findOne({
            where: {VIN: req.body.inputCar}
        })
            .catch((err) => {
                console.log(err)
            })

        car = carr.dataValues.id
    }
    else
        car = null


    let client
    let urClient
    if (req.body.inputUrClient === undefined)
    {
        if (req.body.inputClient === "")
        {
            client=null
            urClient=null
        }
        else
        {
            let cli = await Client.findOne({
                where: {DLNumber: req.body.inputClient}
            })
                .catch((err) => {
                    console.log(err)
                })
            client = cli.dataValues.id
            urClient = null
        }
    }
    else
    {
        let cli = await UrClient.findOne({
            where: {INN: req.body.inputUrClient}
        })
            .catch((err) => {
                console.log(err)
            })
        urClient = cli.dataValues.id
        client = null
    }



    let closeDate
    if (req.body.inputDataClose !== undefined) {
        if ((req.body.inputDataClose.length === 4) ||(req.body.inputDataClose === ""))
            closeDate = null
        else
            closeDate = moment(req.body.inputDataClose, 'DD.MM.YYYY').startOf('day')
    }
    else
        closeDate = null

    let price
    if (req.body.Price === '')
        price = null
    else
        price = req.body.Price




    await ServiceList.update({
        Description: req.body.inputDescription,
        Markup: req.body.inputMarkup,
        Status: status,
        ClientFK: client,
        UrClient: urClient,
        CarFK: car,
        OpenDate: moment(req.body.inputDataOpen, 'DD.MM.YYYY'),
        CloseDate: closeDate,
        Price: price

    }, {where: {id: req.query.OldID}})

    if ( req.body.add !== undefined)
        res.redirect('/servicelist')
})


app.use('/delSL', async function (req, res) {
    await ServiceList.destroy({
        where: {
            id: req.body.id
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})

//WORK WITH CAR

app.use('/getBrand', async function (req, res) {
    let brand = await Brand.findAll({attributes: ['Brand']})
        .catch((err) => {
            console.log(err)
        })

    res.end(JSON.stringify(brand))
})

app.use('/getModel', async function (req, res) {
    let brand = await Brand.findOne({where: {Brand: req.query.Brand}})
        .catch((err) => {
            console.log(err)
        })
    let model = await SprCar.findAll(
        {
            where:{BrandFK:brand.dataValues.id},
            include: [{model: Model, as: 'Model'}]
        })
        .catch((err) => {
            console.log(err)
        })

    res.end(JSON.stringify(model))
})



app.use('/getYear', async function (req, res) {
    let mod = await SprCar.findOne({
        include:[
            {model: Model, where: {Model: req.query.model}, as: 'Model'},
            {model: Brand, as: 'Brand'}
        ]

    })
    //let year = mod.dataValues.StartYear
    if (mod !== null)
        res.end(JSON.stringify(mod))
    else
        res.end("null")
})

app.use('/getBr', async function (req, res) {
    let mod = await Brand.findOne({
        where: {Brand: req.query.brand}

    })
    //let year = mod.dataValues.StartYear
    if (mod !== null)
        res.end("ok")
    else
        res.end("null")
})

app.use('/getEdIzm', async function (req, res) {
    let mod = await EdIzmer.findOne({
        where: {Name: req.query.text}

    })
    if (mod !== null)
        res.end("ok")
    else
        res.end("null")
})

app.use('/getTIB', async function (req, res) {
    let mod = await BreakdownType.findOne({
        where: {Name: req.query.text}

    })
    if (mod !== null)
        res.end("ok")
    else
        res.end("null")
})


app.use('/getTIS', async function (req, res) {
    let mod = await ServiceType.findOne({
        where: {Name: req.query.text}

    })
    if (mod !== null)
        res.end("ok")
    else
        res.end("null")
})

app.use('/getDetail', async function (req, res) {
    let mod = await Detail.findOne({
        where: {Name: req.query.text}

    })
    if (mod !== null)
        res.end("ok")
    else
        res.end("null")
})

app.use('/getBreakdown', async function (req, res) {
    let mod = await Breakdown.findOne({
        where: {Name: req.query.text},
        include: {model: BreakdownType, as: 'BreakdownType'}

    })
    if (mod !== null)
        res.end(JSON.stringify(mod))
    else
        res.end("null")
})

app.use('/getService', async function (req, res) {
    let mod = await Service.findOne({
        where: {Name: req.query.text},
        include: {model: ServiceType, as: 'ServiceType'}

    })
    if (mod !== null)
        res.end(JSON.stringify(mod))
    else
        res.end("null")
})


app.use('/delcar', async function (req, res) {
    await Car.destroy({
        where: {
            VIN: req.body.VIN
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})

app.use('/checkCar', async function (req, res) {
    let car = await Car.findOne({
        where: {GosNumber: req.query.NUM},
        include: [{model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'}]
    })
        .catch((err) => {
            console.log(err)
        })
    let result
    if (car === null || car === undefined)
        result = 'Автомобиль не найден'
    else
        result = 'Автомобиль найден, ' + car.SprCar.Brand.dataValues.Brand + ' ' + car.SprCar.Model.dataValues.Model
    res.end(result)
})


app.use('/addCars', async function (req, res) {
    let brand = await Brand.findOne({
        where:{Brand:req.body.inputBrand}
    })
        .catch((err) => {
            console.log(err)
        })

    let model = await Model.findOne({
        where:{Model:req.body.inputModel}
    })
        .catch((err) => {
            console.log(err)
        })

    let sprCar = await SprCar.findOne({
        where:{BrandFK: brand.dataValues.id,
                ModelFK: model.dataValues.id}
    })
        .catch((err) => {
            console.log(err)
        })

    /*let client
    let urClient

    if(( req.body.inputClient === "")&&( req.body.inputUrClient === ""))
    {
        client = null
        urClient = null
    }
    else
    {
        if( req.body.inputUrClient === "")
        {
            let cl = await Client.findOne({
                where:{DLNumber: req.body.inputClient}
            })
                .catch((err) => {
                    console.log(err)
                })
            client = cl.dataValues.id
            urClient = null
        }
        else
        {
            let cl = await UrClient.findOne({
                where:{INN: req.body.inputClient}
            })
                .catch((err) => {
                    console.log(err)
                })
            urClient = cl.dataValues.id
            client = null
        }
    }*/


    let ca = await Car.create({
        VIN: req.body.inputVIN,
        SprCarFK: sprCar.dataValues.id,
        Year: req.body.inputYear,
        //OwnerFK: client,
        //OwnerUrFK: urClient,
        GosNumber: req.body.inputGosNumber,
        EngineNumber: req.body.inputEngineNumber


    })
        .catch((err) => {
            console.log(err)
        })
    if (req.query.SLID === undefined)
        res.redirect(req.headers.referer)
    else {
        let sl = await ServiceList.update({
            CarFK: ca.dataValues.id
        }, {where: {id: req.query.SLID}})
            .catch((err) => {
                console.log(err)
            })

        res.redirect('/addservicelist?ID=' + req.query.SLID)
    }
})

app.use('/editCar', async function (req, res) {
    let brand = await Brand.findOne({
        where:{Brand:req.body.inputBrand}
    })
        .catch((err) => {
            console.log(err)
        })

    let model = await Model.findOne({
        where:{Model:req.body.inputModel}
    })
        .catch((err) => {
            console.log(err)
        })

    let sprCar = await SprCar.findOne({
        where:{BrandFK: brand.dataValues.id,
            ModelFK: model.dataValues.id}
    })
        .catch((err) => {
            console.log(err)
        })

    /*let client
    let urClient

    if((( req.body.inputClient === "")&&( req.body.inputUrClient === undefined)) ||(( req.body.inputClient === undefined)&&( req.body.inputUrClient === "")))
    {
        client = null
        urClient = null
    }
    else
    {
        if( req.body.inputUrClient === undefined)
        {
            let cl = await Client.findOne({
                where:{DLNumber: req.body.inputClient}
            })
                .catch((err) => {
                    console.log(err)
                })
            client = cl.dataValues.id
            urClient = null
        }
        else
        {
            let cl = await UrClient.findOne({
                where:{INN: req.body.inputClient}
            })
                .catch((err) => {
                    console.log(err)
                })
            urClient = cl.dataValues.id
            client = null
        }
    }*/


    await Car.update({
        VIN: req.body.inputVIN,
        SprCarFK: sprCar.dataValues.id,
        Year: req.body.inputYear,
        //OwnerFK: client,
        //OwnerUrFK: urClient,
        GosNumber: req.body.inputGosNumber,
        EngineNumber: req.body.inputEngineNumber
    }, {where: {id: req.query.OldID}})
    res.redirect('/car')
})


//WORK WITH BREAKDOWN

app.use('/addBreakdown', async function (req, res) {
    let type = await BreakdownType.findOne({
        where:{Name:req.body.inputType}
    })
        .catch((err) => {
            console.log(err)
        })
    await Breakdown.create({
        Name: req.body.inputName,
        Type: type.dataValues.id,
        Price: req.body.inputPrice
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
})

app.use('/delBreakdown', async function (req, res) {
    await Breakdown.destroy({
        where: {
            id: req.body.id
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})


app.use('/addBreakdownsSL', async function (req, res) {
    let breakdown= await Breakdown.findOne({
        where:{Name:req.body.inputBreakdowns}
    })
        .catch((err) => {
            console.log(err)
        })
    await ServiceListBreakdown.create({
        ServiceListBr: breakdown.dataValues.id,
        ServiceListFK: req.query.SLID,
        NumOfService: req.body.inputNumb
    })
        .catch((err) => {
            console.log(err)
        })
    //res.redirect(req.headers.referer)
    res.redirect('/addservicelist?ID='+req.query.SLID)
    //res.redirect('/indexAdmin')
})

//WORK WITH SERVICE

app.use('/addService', async function (req, res) {
    let type = await ServiceType.findOne({
        where:{Name:req.body.inputType}
    })
        .catch((err) => {
            console.log(err)
        })
    await Service.create({
        Name: req.body.inputName,
        Type: type.dataValues.id,
        Price: req.body.inputPrice
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
})

app.use('/delService', async function (req, res) {
    await Service.destroy({
        where: {
            id: req.body.id
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})


app.use('/addServiceSL', async function (req, res) {
    let servis = await Service.findOne({
        where:{Name:req.body.inputServis}
    })
        .catch((err) => {
            console.log(err)
        })
    await ServiceList_Service.create({
        ServiceFK: servis.dataValues.id,
        ServiceListFK: req.query.SLID,
        NumOfService: req.body.inputNumb
    })
        .catch((err) => {
            console.log(err)
        })
    //res.redirect(req.headers.referer)
    res.redirect('/addservicelist?ID='+req.query.SLID)
    //res.redirect('/indexAdmin')
})

//WORK WITH DETAIL

app.use('/addDetail', async function (req, res) {
    let type = await EdIzmer.findOne({
        where:{Name:req.body.inputEdIz}
    })
        .catch((err) => {
            console.log(err)
        })
    await Detail.create({
        Name: req.body.inputName,
        EdIzmerFK: type.dataValues.id,
        Price: req.body.inputPrice
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
})

app.use('/delDetail', async function (req, res) {
    await Detail.destroy({
        where: {
            id: req.body.id
        }
    }).catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})

app.use('/addDetailSL', async function (req, res) {
    let detail = await Detail.findOne({
        where:{Name:req.body.inputDetail}
    })
        .catch((err) => {
            console.log(err)
        })
    await ServiceList_Detail.create({
        DetailFK: detail.dataValues.id,
        ServiceListFK: req.query.SLID,
        Amount: req.body.inputNum
    })
        .catch((err) => {
            console.log(err)
        })
    //res.redirect(req.headers.referer)
    res.redirect('/addservicelist?ID='+req.query.SLID)
    //res.redirect('/indexAdmin')
})


app.use('/getServiceType', async function (req, res) {
    let Type = await ServiceType.findAll({attributes: ['Name']})
        .catch((err) => {
            console.log(err)
        })

    res.end(JSON.stringify(Type))
})

app.use('/getService', async function (req, res) {
    let brand = await ServiceType.findOne({where: {Name: req.query.Type}})
        .catch((err) => {
            console.log(err)
        })
    let model = await Service.findAll(
        {
            where:{Type:brand.dataValues.id},
        })
        .catch((err) => {
            console.log(err)
        })

    res.end(JSON.stringify(model))
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
