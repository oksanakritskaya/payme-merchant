var express = require('express');
var pjson = require('../package.json');
var router = express.Router();


router.get('/', async (req, res, next) => {
  res.render('index', { version: pjson.version });
});

module.exports = router;
