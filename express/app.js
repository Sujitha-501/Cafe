// 'use strict';

var express = require('express');
var app = express();

require('./config/config');     //instantiate configuration variables
require('./global_functions');  //instantiate global functions
require('./constants/messages'); //instantiate the errormessage logs.
console.log("Environment:", CONFIG.app);

const logger = require('morgan');
const bodyParser = require('body-parser');
const v1 = require('./routes/v1');
var cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const cryptoService = require('./services/crypto.service');

app.use(helmet());
app.use(cors());
app.use('/healthcheck', require('express-healthcheck')());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
//Passport
app.use(passport.initialize());

//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', CONFIG.db_name);
}).catch(err => {
  console.error('Unable to connect to SQL database:', CONFIG.db_name, err.message);
});
if (CONFIG.app === 'local') {
  models.sequelize.sync();//creates table if they do not already exist
  // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

app.use(function (req, res, next) {
  if (req && req.headers && req.headers.authorization) {
    req.headers.authorization = cryptoService.decrypt(req.headers.authorization);
  }
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/v1', v1);

// app.use('/', function(req, res){
// 	res.statusCode = 200;//send the appropriate status code
// 	res.json({status:"success", message:"Parcel Pending API", data:{}})
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
console.log('Instances loaded successfully.');


module.exports = app;