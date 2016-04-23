var express = require('express');
var router = express.Router();

/* GET home page middleware. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Babylon JS rocks !', message: 'The Planets' });
});

module.exports = router;
