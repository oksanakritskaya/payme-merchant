const paymeController = require('../controllers/payme.controller')
const router = require('express').Router()

router.post('/pay', paymeController.pay)

module.exports = router;
