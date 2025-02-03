var express = require('express');
var pjson = require('../package.json');
const transactionModel = require("../models/transaction.model");
const {TransactionStateName, TransactionCancelReasonName} = require("../enums/payme.enum");
var router = express.Router();


router.get('/', async (req, res, next) => {
  const transactions = await transactionModel.find({});
  res.render('index', { version: pjson.version, transactions, TransactionStateName, TransactionCancelReasonName });
});

module.exports = router;
