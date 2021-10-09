const Users = require('../models/userModel')

const authAdminTeacher = async (req, res, next) => {
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 1) // if user is a student
            return res.status(400).json({msg: "Access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdminTeacher