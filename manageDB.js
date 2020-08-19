var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://badgerb:z1KV2Ew1dboNtm6f@cluster0.d0llu.mongodb.net/VisaScraper?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 


var Country = require('./models/country')

var deleteCountryByName = function(countryName) {

    //this is only find one you fooking tool
    Country.findOne({origin_name: countryName},function(err,data) {
        if (err) return console.error(err)
        console.log(`deleted: ${data.origin_name}`)
    })
}

deleteCountryByName('')