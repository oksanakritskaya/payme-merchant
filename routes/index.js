var express = require('express');
var pjson = require('../package.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.STOREHOUSE_NUM);
  console.log(process.env.AMOUNT);
  res.render('index', { version: pjson.version });
});

module.exports = router;
