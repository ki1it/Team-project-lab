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
var wagonRouter = require('./routes/wagon')
var wagonListRouter = require('./routes/wagonList')
var curwagonRouter = require('./routes/curwagon')
var clientRouter = require('./routes/client')
var usluguRouter = require('./routes/uslugi')
var polomkiRouter = require('./routes/polomki')
var clientsRouter = require('./routes/clients')
var skladRouter = require('./routes/sklad')
var zapchastiRouter = require('./routes/zapchasti')
var zadachiRouter = require('./routes/zadachi')
var workersRouter = require('./routes/workers')
var zadRouter = require('./routes/zadForWorker')
var workOrderListRouter = require('./routes/workOrderList')
var app = express();
//auth part
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./database/models/User');
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

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
  } else
    {
    next();
  }
};
//end of auth part


const Breakdown  =  require('./database/models/Breakdown')
async function a (){
  await new Promise(done => setTimeout(done, 1000))
  let res = await Breakdown.findAll({
    where:{
      FrequencyMarker: true

    },
    limit:10
  })
  console.log(res)
}
a()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
})
// route for user signup
app.route('/signup')
  .get( (req, res) => {
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

    User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        res.redirect('/login');
      } else if (!user.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        if(user.dataValues.role === 'admin')
          {res.redirect('/signup')}
        if(user.dataValues.role === 'storekeeper')
          {res.redirect('/sklad')}
        if(user.dataValues.role === 'administrator')
          {res.redirect('/wagon')}
        if(user.dataValues.role === 'worker')
          {
            res.redirect('/zadForWorker?id=' + user.dataValues.worker_id)}
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
app.use('/users', usersRouter)
app.use('/wagon', wagonRouter)
app.use('/wagonList', wagonListRouter)
app.use('/curwagon', curwagonRouter)
app.use('/client', clientRouter)
app.use('/uslugi', usluguRouter)
app.use('/polomki', polomkiRouter)
app.use('/zapchasti', zapchastiRouter)
app.use('/clients', clientsRouter)
app.use('/sklad', skladRouter)
app.use('/zadachi', zadachiRouter)
app.use('/workers', workersRouter)
app.use('/zadForWorker', zadRouter)
app.use('/workOrderList', workOrderListRouter)

const NameOfGood = require('./database/models/NameOfGood')
const NameType = require('./database/models/NameType')
const NameStatus = require('./database/models/NameStatus')
const Client = require('./database/models/Client')
const Wagon = require('./database/models/Car')
const ServiceList = require('./database/models/ServiceList')

app.use('/addsklad',async function (req, res) {
  let type = await  NameType.findOne({
    where:{Name: req.body.type}
  })
  await NameOfGood.create({
      Name: req.body.name,
      Amount: parseInt(req.body.col),
      Type: type.dataValues.id,
      Status: 1,
      Price: parseInt(req.body.price)
    }
  )
  res.redirect(req.headers.referer)
})

app.use('/updsklad',async function (req, res) {
  let num = await  NameOfGood.findOne({
    where:{id: req.body.id}
  })
  await NameOfGood.update({
      Amount: parseInt(req.body.col)+num.dataValues.Amount,

    },{where:{id:req.body.id}}
  )
  res.redirect(req.headers.referer)
})

app.use('/minsklad',async function (req, res) {
  let num = await  NameOfGood.findOne({
    where:{id: req.body.id}
  })
  await NameOfGood.update({
      Amount: num.dataValues.Amount - parseInt(req.body.col),

    },{where:{id:req.body.id}}
  )
  res.redirect(req.headers.referer)
})

app.use('/addClient', async function (req, res) {
  await Client.create({
    FirstName: req.body.firstName,
    SecondName: req.body.secondName,
    Patronymic: req.body.patronymic,
    PhoneNumber: req.body.phone,
    Birthday: moment(req.body.calendar, 'YYYY-MM-DD').startOf('day')
  })
  res.redirect(req.headers.referer)
})

app.use('/deleteClient', async function (req, res) {
  await Client.destroy({
    where: {
      id: req.body.id
    }
  })
  res.redirect(req.headers.referer)
})

app.use('/addWagon', async function (req, res) {
  await Wagon.create({
    Brand: req.body.brand,
    Model: req.body.model,
    Capacity: req.body.capacity,
    Type: req.body.type,
    Weight: req.body.weight,
    Year: req.body.year
  })
  res.redirect(req.headers.referer)
})

app.use('/deleteWagon', async function (req, res) {
  await Wagon.destroy({
    where: {
      id: req.body.id
    }
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
  res.redirect(req.headers.referer)
})
app.use('/telegram', async function (req, res) {

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
