const { Schema, model } = require('mongoose')

const storehouseSchema = new Schema(
  {
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model('Storehouse', storehouseSchema)
