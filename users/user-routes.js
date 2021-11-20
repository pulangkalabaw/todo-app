const express = require('express')
const router = express.Router()
const userController = require('./user-controller')
const { getUserById } = require('./user-middleware')

router.get('/', userController.index)
router.post('/create', userController.create)
router.patch('/:id', getUserById, userController.update)
router.get('/:id', getUserById, userController.show)
router.delete('/:id', getUserById, userController.remove)

module.exports = router