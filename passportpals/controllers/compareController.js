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
        let combinedNoVisaRequired = []
        let combinedeVisa = []
        let combinedOnArrival = []
        let combinedOther = []
        let allCountries = []

        for (let i=0;i<results.country1.no_visa_required.length;i++) {
            if (results.country2.no_visa_required.indexOf(results.country1.no_visa_required[i])!=-1){
                combinedNoVisaRequired.push(results.country1.no_visa_required[i])
            } 
            allCountries.push(results.country1.no_visa_required[i])
        }

        for (let i=0;i<results.country1.visa_required.length;i++) {
            if (results.country2.visa_required.indexOf(results.country1.visa_required[i])!=-1){
                combinedVisaRequired.push(results.country1.visa_required[i])
            } 
            allCountries.push(results.country1.visa_required[i])
        }

        for (let i=0;i<results.country1.eVisa.length;i++) {
            if (results.country2.eVisa.indexOf(results.country1.eVisa[i])!=-1){
                combinedeVisa.push(results.country1.eVisa[i])
            } 
            allCountries.push(results.country1.eVisa[i])
        }

        for (let i=0;i<results.country1.visa_on_arrival.length;i++) {
            if (results.country2.visa_on_arrival.indexOf(results.country1.visa_on_arrival[i])!=-1){
                combinedOnArrival.push(results.country1.visa_on_arrival[i])
            } 
            allCountries.push(results.country1.visa_on_arrival[i])
        }

        for (let i=0;i<results.country1.other.length;i++) {
            if (results.country2.other.indexOf(results.country1.other[i])!=-1){
                combinedOther.push(results.country1.other[i])
            } 
            //allCountries.push(results.other[i])
        }

        let data = {no_visa_required: combinedNoVisaRequired, visa_required: combinedVisaRequired,eVisa: combinedeVisa,visa_on_arrival: combinedOnArrival,other: combinedOther}




        res.render('combined-view',{title: `${results.country1.origin_name} and ${results.country2.origin_name}`,data: data})
    })
    //find the two countries in the database and then display their stuff
    //just like the individual country one
}