const { Schema, model } = require('mongoose')

const storehouseSchema = new Schema(
  {
    num: { type: Number },
    price: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = model('Storehouse', storehouseSchema)
