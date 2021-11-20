const express = require('express')
const router = express.Router()
const usersTodoController = require('./user-todos-controller')
const { getUserById, getTodoById } = require('./user-todos-middleware')

router.get('/', usersTodoController.index)
router.patch('/:userId/:todoId/attach', getUserById, getTodoById, usersTodoController.attach)
router.get('/:userId', getUserById, usersTodoController.show)
router.patch('/:userId/:todoId/detach', getUserById, getTodoById, usersTodoController.detach)

module.exports = router