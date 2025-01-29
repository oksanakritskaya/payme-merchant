const TransactionError = require('../errors/transaction.error')
const { PMData, PMError } = require('../enums/payme.enum');

class PaymeService {
  async checkPerformTransaction(params, id) {
    console.log('PaymeService');
    console.log(params);
    console.log(id);
    let { account, amount } = params;
    console.log(account);
    console.log(amount);
    console.log(process.env.STOREHOUSE_NUM);
    console.log(process.env.AMOUNT);

    if (account.storehouse_num !== process.env.STOREHOUSE_NUM) {
      console.log('ProductNotFound')
      throw new TransactionError(PMError.ProductNotFound, id, PMData.ProductId);
    }

    if (amount !== process.env.AMOUNT) {
      console.log('InvalidAmount')
      throw new TransactionError(PMError.InvalidAmount, id);
    }
  }
}

module.exports = new PaymeService();
