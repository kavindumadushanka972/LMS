const Users = require('../models/userModel')

const authStudent = async (req, res, next) => {
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role !== 1) // if user is not an admin
            return res.status(400).json({msg: "You can't enroll to this course since you are not an student."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authStudent