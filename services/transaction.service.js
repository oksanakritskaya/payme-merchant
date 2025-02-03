const { default: mongoose } = require('mongoose');
const TransactionError = require('../errors/transaction.error');
const { PaymeData, PaymeError, TransactionState} = require('../enums/payme.enum');
const transactionModel = require('../models/transaction.model');

class TransactionService {
  async checkPerformTransaction(params, id) {
    let { account, amount } = params;

    if (account.storehouse_num !== process.env.STOREHOUSE_NUM) {
      throw new TransactionError(PaymeError.ProductNotFound, id, PaymeData.ProductId);
    }

    if (amount !== Number(process.env.AMOUNT)) {
      throw new TransactionError(PaymeError.InvalidAmount, id);
    }
  }

  async checkTransaction(params, id) {
    console.log('checkTransaction');
    const transaction = await transactionModel.findOne({ id: params.id });
    console.log(transaction);
    if (!transaction) {
      console.log('not exists');
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }
    console.log('exists');
    return {
      create_time: transaction.create_time,
      perform_time: transaction.perform_time,
      cancel_time: transaction.cancel_time,
      transaction: transaction.id,
      state: transaction.state,
      reason: transaction.reason,
    };
  }

  async createTransaction(params, id) {
    console.log('createTransaction');
    let { account, time, amount } = params;
    console.log(account, time, amount);

    await this.checkPerformTransaction(params, id);

    let transaction = await transactionModel.findOne({ id: params.id })
    console.log(transaction);
    if (transaction) {
      console.log('exists');
      if (transaction.state !== TransactionState.Pending) {
        throw new TransactionError(PaymeError.CantDoOperation, id)
      }
      const currentTime = Date.now()
      const expirationTime = (currentTime - transaction.create_time) / 60000 < 12
      if (!expirationTime) {
        await transactionModel.findOneAndUpdate({ id: params.id }, { state: TransactionState.PendingCanceled, reason: 4 })
        throw new TransactionError(PaymeError.CantDoOperation, id)
      }
      return {
        create_time: transaction.create_time,
        transaction: transaction.id,
        state: TransactionState.Pending,
      }
    }

    console.log('not exists');
    transaction = await transactionModel.findOne({ storehouse_num: account.storehouse_num, provider: 'payme' })
    console.log(transaction);
    if (transaction) {
      console.log('exists');
      if (transaction.state === TransactionState.Paid) throw new TransactionError(PaymeError.AlreadyDone, id)
      if (transaction.state === TransactionState.Pending) throw new TransactionError(PaymeError.Pending, id)
    }

    console.log('create new');
    const newTransaction = await transactionModel.create({
      id: params.id,
      state: TransactionState.Pending,
      amount,
      storehouse_num: account.storehouse_num,
      create_time: time,
      provider: 'payme',
    });
    console.log(newTransaction);

    return {
      transaction: newTransaction.id,
      state: TransactionState.Pending,
      create_time: newTransaction.create_time,
    };
  }
}

module.exports = new TransactionService();
