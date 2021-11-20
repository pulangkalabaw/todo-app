const { userModel } = require('../schemas')
const mongoose = require('mongoose')

const index = async (req, res) => {
    try {
        let user = await userModel.find({})
        res.status(200).json({
            data: user,
            count: user.length
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const create = async (req, res) => {
    try {
        let newUser = new userModel({
            name: req.body.name,
            email: req.body.email
        })

        try {
            await newUser.save()
            res.status(200).json({ message: "Successfully created", data: newUser })
        } catch (error) {
            res.status(500).json({ message: "Failed to create: " + error.message })
        }

    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const show = async (req, res) => {
    try {
        let user = res.user
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(500).json({ message: "Error on server: " + error.message })
    }
}

const update = async (req, res) => {

    let user = res.user

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    try {
        await user.save()
        res.status(200).json({ message: "Successfully updated", data: user })
    } catch (error) {
        res.status(500).json({ message: "Failed to update: " + error.message })
    }
}

const remove = async (req, res) => {
    let user = res.user
    try {
        await user.remove()
        res.status(200).json({ message: "Successfully deleted", data: user })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete: " + error.message })
    }
}

const todoController = { index, create, show, update, remove }
module.exports = todoController