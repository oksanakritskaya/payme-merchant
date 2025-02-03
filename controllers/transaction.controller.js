
const transactionService = require('../services/transaction.service')
const { PaymeMethod } = require("../enums/payme.enum");

class TransactionController {
  async pay(req, res, next) {
    try {
      const { method, params, id } = req.body;

      switch (method) {
        case PaymeMethod.CheckPerformTransaction: {
          await transactionService.checkPerformTransaction(params, id);
          return res.json({ result: { allow: true } });
        }
        case PaymeMethod.CheckTransaction: {
          const result = await transactionService.checkTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.CreateTransaction: {
          const result = await transactionService.createTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.PerformTransaction: {
          const result = await transactionService.performTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.CancelTransaction: {
          const result = await transactionService.cancelTransaction(params, id)
          return res.json({ result, id })
        }
        case PaymeMethod.GetStatement: {
          const result = await transactionService.getStatement(params, id)
          return res.json({ result: { transactions: result } })
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = new TransactionController();
