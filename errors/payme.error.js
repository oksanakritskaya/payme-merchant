const BaseError = require('./base.error')

class PaymeError extends BaseError {
  constructor(transactionError, id, data) {
    super(transactionError.name)

    this.transactionErrorCode = transactionError.code
    this.transactionErrorMessage = transactionError.message
    this.transactionData = data
    this.transactionId = id
    this.isTransactionError = true
  }
}

module.exports = PaymeError
