const express = require('express')
const router = express.Router()
const todoController = require('./todo-controller')
const { getTodoInfoWIthUserInfo, getTodoById } = require('./todo-middleware')

router.get('/', todoController.index)
router.post('/create', todoController.create)
router.patch('/:id', getTodoById, todoController.update)
router.get('/:id', getTodoInfoWIthUserInfo, todoController.show)
router.delete('/:id', getTodoById, todoController.remove)

module.exports = router