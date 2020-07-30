var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport Pals' });
});

router.get('/SouthAfrica',function(req,res,next) {
  res.render('country',{ name: 'South Africa' })
})

module.exports = router;
