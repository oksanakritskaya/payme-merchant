var express = require('express');
var pjson = require('../package.json');
const BaseError = require("../errors/base.error");
const TransactionError = require("../errors/transaction.error");
const {PMError, PMData} = require("../enums/payme.enum");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.STOREHOUSE_NUM);
  console.log(process.env.AMOUNT);
  //throw new Error(PMError.ProductNotFound.name);
  //throw new BaseError(401, 'Unauthorized');
  //throw new TransactionError(PMError.ProductNotFound, 12345, PMData.ProductId);
  res.render('index', { version: pjson.version });
});

module.exports = router;
