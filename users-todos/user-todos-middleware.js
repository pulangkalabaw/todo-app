const { userModel, todoModel } = require('../schemas')
const mongoose = require('mongoose')

const getUserById = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.userId)

        if (!user) {
            res.status(400).json({ message: "Could not find the user" })
            return
        }
        else {
            res.user = user
            next()    
        }
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
        return
    }
}

const getTodoById = async (req, res, next) => {
    try {
        let todo = await todoModel.findById(req.params.todoId)

        if (!todo) {
            res.status(400).json({ message: "Could not find the todo record" })
            return
        }
        else {
            res.todo = todo
            next()    
        }
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
        return
    }
}

module.exports = { 
    getUserById,
    getTodoById
}