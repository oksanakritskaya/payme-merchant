const { default: mongoose } = require('mongoose');
const transactionModel = require('../models/transaction.model');

class TransactionApiController {
  async get(req, res, next) {
    try {
      console.log('TransactionApiController get');
      const transactions = await transactionModel.find({});
      res.status(200).json(transactions);

    } catch (error) {
      console.log('TransactionApiController get error');
      console.error(error);
      //next(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getBuId(req, res, next) {
    try {
      console.log('TransactionApiController getBuId');
      console.log(req.body);
      const { id } = req.params;
      const transaction = await transactionModel.findById({_id: id});
      console.log(transaction);
      res.status(200).json(transaction);

    } catch (error) {
      console.log('TransactionApiController getBuId error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async post(req, res, next) {
    try {
      console.log('TransactionApiController post');
      console.log(req.body);
      const transaction = await transactionModel.create(req.body);
      console.log(transaction);
      res.status(200).json(transaction);

    } catch (error) {
      console.log('TransactionApiController post error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async put(req, res, next) {
    try {
      console.log('TransactionApiController put');
      console.log(req.body);
      const { id } = req.params;
      const transaction = await transactionModel.findByIdAndUpdate(id, req.body);

      if (!transaction) {
        return res.status(404).json({ message: 'Not Found' });
      }

      const updatedTransaction = await transactionModel.findById(id);
      console.log(updatedTransaction);
      res.status(200).json(updatedTransaction);

    } catch (error) {
      console.log('TransactionApiController put error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async delete(req, res, next) {
    try {
      console.log('TransactionApiController delete bu id');
      console.log(req.body);
      const { id } = req.params;
      const transaction = await transactionModel.findByIdAndDelete(id);

      if (!transaction) {
        return res.status(404).json({ message: 'Not Found' });
      }

      console.log(transaction);
      res.status(200).json({ message: 'Successfully deleted' });

    } catch (error) {
      console.log('TransactionApiController delete error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }
}

module.exports = new TransactionApiController();
