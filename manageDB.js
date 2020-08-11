var async = require('async')
var Country = require('./models/country')
require('dotenv').config({path: __dirname + '/.env'})

var mongoose = require('mongoose')
var mongoDB = process.env.DB_URI
mongoose.connect(mongoDB,  { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promis = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))