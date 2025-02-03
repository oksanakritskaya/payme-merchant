const { Schema, model } = require('mongoose')

const transactionSchema = new Schema(
  {
    id: { type: String },
    storehouse_num: { type: String },
    amount: { type: Number },
    state: { type: Number },
    create_time: { type: Number, default: Date.now() },
    perform_time: { type: Number, default: 0 },
    cancel_time: { type: Number, default: 0 },
    reason: { type: Number, default: null },
    provider: { type: String },
  },
  { timestamps: true }
)

module.exports = model('Transaction', transactionSchema)
