const router = require('express').Router()
const transactionApiController = require('../controllers/transaction-api.controller')

router.get('/', transactionApiController.get)
router.get('/:id', transactionApiController.getBuId)
router.post('/', transactionApiController.post)
router.put('/:id', transactionApiController.put)
router.delete('/:id', transactionApiController.delete)

module.exports = router;
