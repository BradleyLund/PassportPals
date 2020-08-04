var Country = require('../models/country')
var async = require('async')

const validator = require('express-validator')
const { count } = require('../models/country')

exports.compareCountry_get = function(req,res,next) {
    //get all countries and then send them to the view

    //find all countries and then select only the origin_name?
    Country.find({},function(err,countries) {
        if (err) {return next(err)}
        res.render('compareCountry',{ title: 'Compare Countries', countries: countries})
    })
}