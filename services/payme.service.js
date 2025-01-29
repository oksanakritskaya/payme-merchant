const PaymeError = require('../errors/payme.error')
const { PMData, PMError } = require('../enums/payme.enum');

class PaymeService {
  async checkPerformTransaction(params, id) {
    console.log('PaymeService');
    console.log(params);
    console.log(id);
    let { account, amount } = params;
    console.log(account);
    console.log(amount);

    if (account.storehouse_num !== process.env.STOREHOUSE_NUM) {
      console.log('ProductNotFound')
      throw new PaymeError(PMError.ProductNotFound, id, PMData.ProductId);
    }

    if (amount !== process.env.AMOUNT) {
      console.log('InvalidAmount')
      throw new PaymeError(PMError.InvalidAmount, id);
    }
  }
}

module.exports = new PaymeService();
