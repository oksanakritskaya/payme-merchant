const BaseError = require('../errors/base.error')

module.exports = function (err, req, res, next) {
  console.log('errorMiddleware');
  console.log(err.isTransactionError);
  if (err.isTransactionError) {
    return res.json({
      error: { code: err.transactionErrorCode, message: err.transactionErrorMessage, data: err.transactionData },
      id: err.transactionId,
    })
  }

  console.log(err instanceof BaseError);
  if (err instanceof BaseError) {
    console.log(err.status);
    console.log(err.message);
    console.log(err.errors);
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  console.log('else');
  return res.status(500).json({ message: err.message })
}
