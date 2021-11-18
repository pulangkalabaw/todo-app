const express = require('express')
const router = express.Router()
const userController = require('./user-controller')
const { getuserInfoWIthUserInfo, getuserById } = require('./user-middleware')

router.get('/', userController.index)
router.post('/create', userController.create)
router.patch('/:id', getuserById, userController.update)
router.get('/:id', getuserById, userController.show)
router.delete('/:id', getuserById, userController.remove)

module.exports = router