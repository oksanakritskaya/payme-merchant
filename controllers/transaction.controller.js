
const transactionService = require('../services/transaction.service')
const { PaymeMethod } = require("../enums/payme.enum");

class TransactionController {
  async pay(req, res, next) {
    try {
      console.log('TransactionController');
      const { method, params, id } = req.body;
      console.log(method, params, id);

      switch (method) {
        case PaymeMethod.CheckPerformTransaction: {
          console.log('CheckPerformTransaction');
          await transactionService.checkPerformTransaction(params, id);
          return res.json({ result: { allow: true } });
        }
        case PaymeMethod.CheckTransaction: {
          console.log('CheckTransaction');
          const result = await transactionService.checkTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.CreateTransaction: {
          console.log('CreateTransaction');
          const result = await transactionService.createTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.PerformTransaction: {
          console.log('PerformTransaction');
          const result = await transactionService.performTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.CancelTransaction: {
          console.log('CancelTransaction');
          const result = await transactionService.cancelTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.GetStatement: {
          console.log('GetStatement');
          const result = await transactionService.getStatement(params, id)
          return res.json({ result: { transactions: result } })
        }
      }
    } catch (error) {
      console.log('error');
      console.error(error);
      next(error);
    }
  }
}

module.exports = new TransactionController();
