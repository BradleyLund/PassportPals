var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression')
var helmet = require('helmet')

require('dotenv').config({path: __dirname + '/.env'})

var individualCountryRouter = require('./routes/individualCountry')
var compareCountryRouter = require('./routes/compareCountry')
var mongoose = require('mongoose')

var mongoDB =  process.env.DB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true })
var db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDB connection error:'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(compression())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',compareCountryRouter)
app.use('/IndividualCountry',individualCountryRouter) //maybe use this for individual country


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
