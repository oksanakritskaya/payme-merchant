const paymeController = require('../controllers/payme.controller')
const { paymeCheckToken } = require("../middlewares/payme.middleware");
const router = require('express').Router()

router.post('/pay', paymeCheckToken, paymeController.pay)

module.exports = router;
