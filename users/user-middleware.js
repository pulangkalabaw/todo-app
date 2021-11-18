const { userModel } = require('../schemas')
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

const getuserById = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.id)

        if (!user) {
            res.status(400).json({ message: "Could not find the record" })
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
    getuserById
}