const { todoModel } = require('../schemas')
const mongoose = require('mongoose')
const Types = mongoose.Types

const getUserInfoLookup =
{
    $lookup: {
        from: 'users',
        as: 'created_by_info',
        localField: 'created_by',
        foreignField: '_id',
        pipeline: [
            {
                $limit: 1
            }
        ]
    }
}

const index = async (req, res) => {
    try {
        let todosWithUser = await todoModel.aggregate([getUserInfoLookup])
        res.status(200).json({
            data: todosWithUser,
            count: todosWithUser.length
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const create = async (req, res) => {
    try {
        let newTodo = new todoModel({
            todo_name: req.body.todo_name || 'Unnamed Todo',
            created_by: req.body.created_by || null
        })

        try {
            await newTodo.save()
            res.status(200).json({ message: "Successfully created", data: newTodo })
        } catch (error) {
            res.status(500).json({ message: "Failed to create: " + error.message })
        }

    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const show = async (req, res) => {
    try {
        let todoWithUser = res.todoWithUser
        res.status(200).json({
            data: todoWithUser,
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const update = async (req, res) => {

    let todoWithUser = res.todoWithUser

    todoWithUser.todo_name = req.body.todo_name || todoWithUser.todo_name
    todoWithUser.updated_by = req.body.updated_by || null
    todoWithUser.updated_date = new Date()

    try {
        await todoWithUser.save()
        res.status(200).json({ message: "Successfully updated", data: todoWithUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to update: " + error.message })
    }
}

const remove = async (req, res) => {
    let todoWithUser = res.todoWithUser
    try {
        await todoWithUser.remove()
        res.status(200).json({ message: "Successfully deleted", data: todoWithUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete: " + error.message })
    }
}

const todoController = { index, create, show, update, remove }
module.exports = todoController