var express = require('express');
var router = express.Router();

//require the controller module
var country_controller = require('../controllers/indCountryController')


/* GET users listing. */
router.get('/:countryName', country_controller.countryDetail);

module.exports = router;
