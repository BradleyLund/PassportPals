var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({path: __dirname + '/.env'})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var steven = require('./routes/steven')
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/steven',steven) //maybe use this for individual country

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var Schema = mongoose.Schema

var SubSchema = mongoose.Schema({
    //your subschema content
    description: String,
    duration: Number,
    date: String 
},{ _id : false });



var UserSchema = new Schema({
  username: String,
  exercise: [SubSchema]
  
})

var User = mongoose.model('User',UserSchema)

User.findOne({},function(err,user) {
  if (err) {console.log(error)}
  console.log(user)
})

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
