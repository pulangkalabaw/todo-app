const { userModel } = require('../schemas')
const mongoose = require('mongoose')
const Types = mongoose.Types

const getTodosLookup =
{
    $lookup: {
        from: 'todos',
        as: 'todos',
        localField: '_id',
        foreignField: 'created_by',
    }
}

const index = async (req, res) => {
    try {
        let usersTodos = await userModel.aggregate([getTodosLookup])
        res.status(200).json({
            data: usersTodos,
            count: usersTodos.length
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const attach = async (req, res) => {
    try {
        res.todo.created_by = req.params.userId
        res.todo.updated_date = new Date()

        try {
            await res.todo.save()
            res.status(200).json({ message: "Successfully attached", data: res.user })
        } catch (error) {
            res.status(500).json({ message: "Failed to attach: " + error.message })
        }

    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const show = async (req, res) => {
    try {
        let userId = Types.ObjectId(req.params.userId)
        let user = await userModel.aggregate([
            getTodosLookup,
            {
                $match: {
                    "_id": userId
                }
            }
        ])
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const detach = async (req, res) => {
    try {
        res.todo.created_by = null
        await res.todo.save()

        res.status(200).json({ message: "Successfully removed", data: res.todo })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete: " + error.message })
    }
}

const usersTodoController = { index, attach, show, detach }
module.exports = usersTodoController