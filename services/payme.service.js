const { default: mongoose } = require('mongoose');
const TransactionError = require('../errors/transaction.error');
const { PMData, PMError } = require('../enums/payme.enum');
const transactionModel = require('../models/transaction.model');

class PaymeService {
  async checkPerformTransaction(params, id) {
    let { account, amount } = params;
    console.log('checkPerformTransaction', account, id);

    if (account.storehouse_num !== process.env.STOREHOUSE_NUM) {
      console.log('ProductNotFound');
      throw new TransactionError(PMError.ProductNotFound, id, PMData.ProductId);
    }

    if (amount !== Number(process.env.AMOUNT)) {
      throw new TransactionError(PMError.InvalidAmount, id);
    }
  }
}

module.exports = new PaymeService();
