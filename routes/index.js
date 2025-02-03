var express = require('express');
var pjson = require('../package.json');
const transactionModel = require("../models/transaction.model");
const createError = require("http-errors");
const BaseError = require("../errors/base.error");
var router = express.Router();


router.get('/', async (req, res, next) => {
  const transactions = await transactionModel.find({});
  res.render('index', { version: pjson.version, transactions });
});

router.get('/transaction/:id', async (req, res, next) => {
  console.log('tut');
  const { id } = req.params;
  console.log(id);
  const transaction = await transactionModel.findOne({ id });
  console.log(transaction);
  if (!transaction) {
    next(new Error('Transaction not found'));
  }

  res.render('transaction', { transaction });
});

module.exports = router;
