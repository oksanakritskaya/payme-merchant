const base64 = require('base-64')

const TransactionError = require('../errors/transaction.error')
const { PaymeError } = require('../enums/payme.enum')

const PAYME_MERCHANT_KEY = process.env.PAYME_MERCHANT_KEY

exports.paymeCheckToken = (req, res, next) => {
  try {
    console.log('paymeCheckToken');
    const { id } = req.body;
    console.log(id);
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
      console.log('!token');
      throw new TransactionError(PaymeError.InvalidAuthorization, id);
    }

    const data = base64.decode(token);
    console.log(data);

    if (!data.includes(PAYME_MERCHANT_KEY)) {
      console.log('!!data.includes(PAYME_MERCHANT_KEY)');
      throw new TransactionError(PaymeError.InvalidAuthorization, id);
    }

    next();
  } catch (err) {
    console.log('catch error');
    next(err);
  }
}
