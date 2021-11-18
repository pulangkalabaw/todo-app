const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new mongoose.Schema({
    todo_name: {
        type: String,
        required: true
    },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null },
    created_by: { type: Schema.Types.ObjectId },
    updated_by: { type: Schema.Types.ObjectId, default: null },
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        dropDups: true
    },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null },
})

const todoModel = mongoose.model('todos', todoSchema)
const userModel = mongoose.model('users', userSchema)

module.exports = {
    todoModel,
    userModel
}