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

const getTodoById = async (req, res, next) => {
    try {
        let todoWithUser = await todoModel.findById(req.params.id)

        if (!todoWithUser) {
            res.status(400).json({ message: "Could not find the todo record" })
            return
        }
        else {
            res.todoWithUser = todoWithUser
            next()    
        }
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
        return
    }
}

const getTodoInfoWIthUserInfo = async (req, res, next) => {
    try {
        let todoId = Types.ObjectId(req.params.id)
        let todoWithUser = await todoModel.aggregate([
            getUserInfoLookup,
            {
                $match: {
                    "_id": todoId
                }
            }
        ])

        if (todoWithUser.length == 0) {
            res.status(400).json({ message: "Could not find the record" })
            return
        }
        else {
            res.todoWithUser = todoWithUser
            next()    
        }
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
        return
    }
}

module.exports = { 
    getTodoInfoWIthUserInfo,
    getTodoById
}