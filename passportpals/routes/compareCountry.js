var express = require('express');
var router = express.Router();

var compareController = require('../controllers/compareController')

router.get('/',compareController.compareCountry_get)

router.get('/comp',function(req,res) {
    res.send(`${req.query.country} ${req.query.country2}`)

    //find the two countries in the database and then display their stuff
    //just like the individual country one
})

module.exports = router
