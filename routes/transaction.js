var express = require('express');
var router = express.Router();
const transactionModel = require('../models/transaction.model');


router.get('/', async (req, res, next) => {
  const transactions = await transactionModel.find({});
  res.render('transactions', { transactions });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionModel.findById({ _id: id });
  res.render('transaction', { transaction });
});

module.exports = router;
