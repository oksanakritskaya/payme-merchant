var express = require('express');
var pjson = require('../package.json');
const transactionModel = require("../models/transaction.model");
var router = express.Router();


router.get('/', async (req, res, next) => {
  const transactions = await transactionModel.find({});
  res.render('index', { version: pjson.version, transactions });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionModel.findOne({ id });
  res.render('transaction', { version: pjson.version, transaction });
});

module.exports = router;
