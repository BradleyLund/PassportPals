var express = require('express');
var router = express.Router();

var compareController = require('../controllers/compareController')

router.get('/',compareController.compareCountry_get)

module.exports = router
