const { default: mongoose } = require('mongoose');
const storehouseModel = require('../models/storehouse.model');

class StorehouseApiController {
  async get(req, res, next) {
    try {
      console.log('StorehouseController get');
      const storehouses = await storehouseModel.find({});
      res.status(200).json(storehouses);

    } catch (error) {
      console.log('StorehouseController get error');
      console.error(error);
      //next(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getBuId(req, res, next) {
    try {
      console.log('StorehouseController getBuId');
      console.log(req.body);
      const { id } = req.params;
      const storehouse = await storehouseModel.findById({_id: id});
      console.log(storehouse);
      res.status(200).json(storehouse);

    } catch (error) {
      console.log('StorehouseController getBuId error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async post(req, res, next) {
    try {
      console.log('StorehouseController post');
      console.log(req.body);
      const storehouse = await storehouseModel.create(req.body);
      console.log(storehouse);
      res.status(200).json(storehouse);

    } catch (error) {
      console.log('StorehouseController post error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async put(req, res, next) {
    try {
      console.log('StorehouseController put');
      console.log(req.body);
      const { id } = req.params;
      const storehouse = await storehouseModel.findByIdAndUpdate(id, req.body);

      if (!storehouse) {
        return res.status(404).json({ message: 'Not Found' });
      }

      const updatedStorehouse = await storehouseModel.findById(id);
      console.log(updatedStorehouse);
      res.status(200).json(updatedStorehouse);

    } catch (error) {
      console.log('StorehouseController put error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }

  async delete(req, res, next) {
    try {
      console.log('StorehouseController delete bu id');
      console.log(req.body);
      const { id } = req.params;
      const storehouse = await storehouseModel.findByIdAndDelete(id);

      if (!storehouse) {
        return res.status(404).json({ message: 'Not Found' });
      }

      console.log(storehouse);
      res.status(200).json({ message: 'Successfully deleted' });

    } catch (error) {
      console.log('StorehouseController delete error');
      console.error(error);
      //next(error);
      res.status(500).json({message: error.message});
    }
  }
}

module.exports = new StorehouseApiController();
