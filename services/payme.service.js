const { default: mongoose } = require('mongoose');
const TransactionError = require('../errors/transaction.error');
const { PMData, PMError, PMState} = require('../enums/payme.enum');
const transactionModel = require('../models/transaction.model');

class PaymeService {
  async checkPerformTransaction(params, id) {
    let { account, amount } = params;

    if (account.storehouse_num !== process.env.STOREHOUSE_NUM) {
      throw new TransactionError(PMError.ProductNotFound, id, PMData.ProductId);
    }

    if (amount !== Number(process.env.AMOUNT)) {
      throw new TransactionError(PMError.InvalidAmount, id);
    }
  }

  async createTransaction(params, id) {
    console.log('createTransaction');
    let { account, time, amount } = params;
    console.log(account, time, amount);

    await this.checkPerformTransaction(params, id);

    /*let transaction = await transactionModel.findOne({ id: params.id })
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
    transaction = await transactionModel.findOne({ user: account.user_id, product: account.product_id, provider: 'payme' })
    if (transaction) {
      if (transaction.state === TransactionState.Paid) throw new TransactionError(PaymeError.AlreadyDone, id)
      if (transaction.state === TransactionState.Pending) throw new TransactionError(PaymeError.Pending, id)
    }*/

    console.log('create new');
    const newTransaction = await transactionModel.create({
      id: params.id,
      state: PMState.Pending,
      amount,
      storehouse_num: account.storehouse_num,
      create_time: time,
      provider: 'payme',
    });
    console.log(newTransaction);

    return {
      transaction: newTransaction.id,
      state: PMState.Pending,
      create_time: newTransaction.create_time,
    };
  }
}

module.exports = new PaymeService();
