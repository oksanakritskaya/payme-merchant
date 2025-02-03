const transactionController = require('../controllers/transaction.controller')
const { paymeCheckToken } = require("../middlewares/payme.middleware");
const router = require('express').Router()

router.post('/pay', paymeCheckToken, transactionController.pay)

module.exports = router;
