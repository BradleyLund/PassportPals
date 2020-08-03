var Country = require('../models/country')
var async = require('async')

//display a list of all the visa detail for the specified country
exports.countryDetail = function(req,res) {
    //could be an issue with the req.param due to spaces in the name
    Country.findOne({origin_name: `${req.params.countryName}`},function(err,data) {
       if (err) console.log('couldnt find anything')
       //if successful render the data about the country
       console.log(req.params.countryName)
       res.render('country',{origin_country: `${req.params.countryName}`, data: data})
    })

}