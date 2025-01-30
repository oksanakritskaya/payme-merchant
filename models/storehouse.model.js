const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const storehouseSchema = new Schema(
  {
    num: { type: String, unique: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);
storehouseSchema.plugin(uniqueValidator);

module.exports = model('Storehouse', storehouseSchema)
