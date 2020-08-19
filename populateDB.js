var async = require('async')
var Country = require('./models/country')
require('dotenv').config({path: __dirname + '/.env'})

var mongoose = require('mongoose')
var mongoDB = process.env.DB_URI
mongoose.connect(mongoDB,  { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promis = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


async function countryCreate(origin_name,visa_required,no_visa_required,eVisa,visa_on_arrival,other) {
    var country = new Country({
        origin_name: origin_name,
        visa_required: visa_required,
        no_visa_required: no_visa_required,
        eVisa: eVisa,
        visa_on_arrival: visa_on_arrival,
        other: other
    })

    country.save(function(err){
        if (err) {
            console.log(err)
        }
        console.log('New Country: '+origin_name)
    })
}

module.exports = {
    countryCreate
}

//I think when I am scraping the data I need to create an entry for the country in the database
//because then in the scraper.js file we can require this file
//and run this function as it goes!
//let me test it just with south africa and see what happens