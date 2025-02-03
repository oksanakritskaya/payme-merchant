const { default: mongoose } = require('mongoose');
const TransactionError = require('../errors/transaction.error');
const { PaymeData, PaymeError, TransactionState, TransactionCancelReason} = require('../enums/payme.enum');
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

    console.log('success');
  }

  async checkTransaction(params, id) {
    console.log('checkTransaction');
    const transaction = await transactionModel.findOne({ id: params.id });
    console.log(transaction);
    if (!transaction) {
      console.log('not exists');
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }
    console.log('success');
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
        throw new TransactionError(PaymeError.CantDoOperation, id);
      }
      const currentTime = Date.now();
      const expirationTime = (currentTime - transaction.create_time) / 60000 < 12;
      console.log(expirationTime);
      if (!expirationTime) {
        console.log('no expirationTime');
        await transactionModel.findOneAndUpdate(
          { id: params.id },
          { state: TransactionState.PendingCanceled, reason: TransactionCancelReason.transactionExpired }
        );
        throw new TransactionError(PaymeError.CantDoOperation, id);
      }
      console.log('success');
      return {
        create_time: transaction.create_time,
        transaction: transaction.id,
        state: TransactionState.Pending,
      };
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

  async performTransaction(params, id) {
    console.log('performTransaction');
    const currentTime = Date.now();

    const transaction = await transactionModel.findOne({ id: params.id });
    console.log(transaction);
    if (!transaction) {
      console.log('not exists');
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }
    console.log('exists');
    if (transaction.state !== TransactionState.Pending) {
      if (transaction.state !== TransactionState.Paid) {
        throw new TransactionError(PaymeError.CantDoOperation, id);
      }

      return {
        perform_time: transaction.perform_time,
        transaction: transaction.id,
        state: TransactionState.Paid,
      };
    }
    /*const expirationTime = (currentTime - transaction.create_time) / 60000 < 12;
    console.log(expirationTime);
    if (!expirationTime) {
      console.log('no expirationTime');
      await transactionModel.findOneAndUpdate(
        { id: params.id },
        { state: TransactionState.PendingCanceled, reason: TransactionCancelReason.transactionExpired, cancel_time: currentTime }
      )
      throw new TransactionError(PaymeError.CantDoOperation, id)
    }*/

    await transactionModel.findOneAndUpdate({ id: params.id }, { state: TransactionState.Paid, perform_time: currentTime })
    // await orderModel.findOneAndUpdate({ transaction: params.id }, { state: OrderState.Paid })
    // await userModel.findOneAndUpdate({ id: transaction.user }, { $inc: { balance: transaction.amount } })
    // await userModel.findOneAndUpdate({ id: transaction.user }, { vip: true })

    return {
      perform_time: currentTime,
      transaction: transaction.id,
      state: TransactionState.Paid,
    }
  }

  async cancelTransaction(params, id) {
    console.log('cancelTransaction');
    const transaction = await transactionModel.findOne({ id: params.id });
    console.log(transaction);

    if (!transaction) {
      console.log('not exists');
      throw new TransactionError(PaymeError.TransactionNotFound, id);
    }

    const currentTime = Date.now();

    if (transaction.state > 0) {
      console.log('transaction.state > 0');
      await transactionModel.findOneAndUpdate(
        { id: params.id },
        { state: -Math.abs(transaction.state), reason: params.reason, cancel_time: currentTime }
      );
    }

    console.log('success');
    return {
      cancel_time: transaction.cancel_time || currentTime,
      transaction: transaction.id,
      state: -Math.abs(transaction.state),
    };
  }

  async getStatement(params) {
    console.log('getStatement');
    const { from, to } = params;
    console.log(from, to);
    const transactions = await transactionModel.find({ create_time: { $gte: from, $lte: to }, provider: 'payme' })
    console.log(transactions);

    return transactions.map(transaction => ({
      id: transaction.id,
      time: transaction.create_time,
      amount: transaction.amount,
      account: {
        storehouse_num: transaction.storehouse_num,
      },
      create_time: transaction.create_time,
      perform_time: transaction.perform_time,
      cancel_time: transaction.cancel_time,
      transaction: transaction.id,
      state: transaction.state,
      reason: transaction.reason,
    }))
  }
}

module.exports = new TransactionService();
