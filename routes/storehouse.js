const router = require('express').Router()
const storehouseController = require('../controllers/storehouse.controller')

router.get('/', storehouseController.get)
router.get('/:id', storehouseController.getBuId)
router.post('/', storehouseController.post)
router.put('/:id', storehouseController.put)
router.delete('/:id', storehouseController.delete)

module.exports = router;
