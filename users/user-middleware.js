const { userModel } = require('../schemas')
const mongoose = require('mongoose')

const getUserById = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.id)

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

module.exports = { 
    getUserById
}