const BaseError = require('./base.error')

class TransactionError extends BaseError {
	constructor(transactionError, id, data) {
		super(transactionError.name);
		console.log('TransactionError');
		console.log(transactionError);

		this.transactionErrorCode = transactionError.code
		this.transactionErrorMessage = transactionError.message
		this.transactionData = data
		this.transactionId = id
		this.isTransactionError = true
	}
}

module.exports = TransactionError
