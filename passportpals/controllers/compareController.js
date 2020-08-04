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

exports.compareTwo = function(req,res,next) {
    async.parallel({
        country1: function(callback) {
            Country.findOne({origin_name: `${req.query.country}`},callback)
        },
        country2: function(callback) {
            Country.findOne({origin_name: `${req.query.country2}`},callback)
        },
    }, function(err,results) {
        if (err) {return next(err)}
        //compare the two countries and make a new country object to send to a render page
        let combinedVisaRequired = []
        let combindeNoVisaRequired = []
        let combinedeVisa = []
        let combinedOnArrival = []
        let combinedOther = []

        for (let i=0;i<results.country1.no_visa_required.length;i++) {
            if (results.country2.no_visa_required.indexOf(results.country1.no_visa_required[i])!=-1){
                combindeNoVisaRequired.push(results.country1.no_visa_required[i])
            }
        }

        res.json(combindeNoVisaRequired)
    })
    //find the two countries in the database and then display their stuff
    //just like the individual country one
}