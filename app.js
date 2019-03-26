var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
require('dotenv').config()
require('./database/lib/dbInit')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addServiceListRouter = require('./routes/addServiceList')
var servicelistRouter = require('./routes/servicelist')
var clientRouter = require('./routes/client')
var clientsRouter = require('./routes/clients')
var workersRouter = require('./routes/workers')
var aboutRouter = require('./routes/about')
var carRouter = require('./routes/car')
var editClientRouter = require('./routes/editClient')
var urClientRouter = require('./routes/urClient')
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
    res.redirect('/index');
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
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                if (user.dataValues.role === 'admin') {
                    res.redirect('/signup')
                }
                if (user.dataValues.role === 'administrator') {
                    res.redirect('/servicelist')
                }
                if (user.dataValues.role === 'worker') {
                    res.redirect('/zadForWorker?id=' + user.dataValues.worker_id)
                }
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
app.use('/clients', clientsRouter)
app.use('/workers', workersRouter)
app.use('/about', aboutRouter)
app.use('/car', carRouter )
app.use('/editClient', editClientRouter )
app.use('/urclient', urClientRouter)


const Client = require('./database/models/Client')
const Car = require('./database/models/Car')
const SprCar = require('./database/models/SprCar')
const Brand = require('./database/models/Brand')
const Model = require('./database/models/Model')
const ServiceList = require('./database/models/ServiceList')
const UrClient = require('./database/models/UrClient')

app.use('/updateClient', async function (req, res) {
    await Client.update({
        FirstName: req.body.inputName,
        SecondName: req.body.inputSecondName,
        Patronymic: req.body.inputPatronymic,
        PhoneNumber: req.body.inputPhoneNumber,
        Adress:req.body.inputAdress,
        DLNumber: req.body.inputDLN,
        Birthday: moment(req.body.inputBD, 'DD.MM.YYYY').startOf('day')
    },{where:{DLNumber: req.query.OldDLN}}
    )
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/client')
})



app.use('/closeSL', async function (req, res) {
    await ServiceList.update({
        Status: 2,
        CloseDate: moment().format()
        },{where:{id: req.body.id}}
    )
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/servicelist')
})
app.use('/checkClient', async function (req, res) {
    let cl = await Client.findOne({
       where:{DLNumber:req.query.DLN}
    })
        .catch((err) => {
            console.log(err)
        })
    let result
    if(cl === null || cl == undefined)
        result = 'Клиент не найден'
    else
        result = 'Клиент найден, '+cl.dataValues.FirstName
    res.end(result)
})

app.use('/checkCar', async function (req, res) {
    let car = await Car.findOne({
        where:{VIN:req.query.VIN},
        include: [{ model: SprCar, include: [{model: Brand, as: 'Brand'}, {model: Model, as: 'Model'}], as: 'SprCar'}]
    })
        .catch((err) => {
            console.log(err)
        })
    let result
    if(car === null || car === undefined)
        result = 'Автомобиль не найден'
    else
        result = 'Автомобиль найден, '+car.SprCar.Brand.dataValues.Brand + ' ' + car.SprCar.Model.dataValues.Model
    res.end(result)
})
app.use('/addClient', async function (req, res) {
    await Client.create({
      FirstName: req.body.inputName,
      SecondName: req.body.inputSecondName,
      Patronymic: req.body.inputPatronymic,
      PhoneNumber: req.body.inputPhoneNumber,
        Adress:req.body.inputAdress,
        DLNumber: req.body.inputDLN,
      Birthday: moment(req.body.inputBD, 'DD.MM.YYYY').startOf('day')
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
})


app.use('/addUrClient', async function (req, res) {
    await UrClient.create({
        Name: req.body.inputName,
        INN: req.body.inputINN,
        PhoneNumber: req.body.inputPhoneNumber,
        Adress:req.body.inputAdress
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
})


app.use('/delclient', async function (req, res) {
    await Client.destroy({
        where: {
            DLNumber: req.body.DLN
        }
    })  .catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})


app.use('/delurclient', async function (req, res) {
    await UrClient.destroy({
        where: {
            INN: req.body.INN
        }
    })  .catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})


app.use('/delcar', async function (req, res) {
    await Car.destroy({
        where: {
            VIN: req.body.VIN
        }
    })  .catch((err) => {
        console.log(err)
    })
    res.redirect(req.headers.referer)
})

app.use('/addServiceList', async function (req, res) {
    await ServiceList.create({
        Description: req.body.description,
        Status: req.body.status,
        ClientFK: req.body.client,
        WagonFK: req.body.wagon
    })
        .catch((err) => {
            console.log(err)
        })
    res.redirect(req.headers.referer)
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
