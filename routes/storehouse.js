var express = require('express');
var router = express.Router();
const storehouseModel = require('../models/storehouse.model');


router.get('/', async (req, res, next) => {
  const storehouses = await storehouseModel.find({});
  res.render('storehouses', { storehouses });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const storehouse = await storehouseModel.findById({ _id: id });
  res.render('storehouse', { storehouse });
});

module.exports = router;
