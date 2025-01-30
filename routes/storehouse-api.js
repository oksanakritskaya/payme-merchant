const router = require('express').Router()
const storehouseApiController = require('../controllers/storehouse-api.controller')

router.get('/', storehouseApiController.get)
router.get('/:id', storehouseApiController.getBuId)
router.post('/', storehouseApiController.post)
router.put('/:id', storehouseApiController.put)
router.delete('/:id', storehouseApiController.delete)

module.exports = router;
