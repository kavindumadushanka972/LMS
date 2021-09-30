const Users  = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {

    register: async (req, res) => {
        try {
            const {name, email, password, passwordConf, role} = req.body

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: 'The email already exists.'})

            if (password.length < 6)
                return res.status(400).json({msg: 'Password length should be atleast 6 characters long.'})

            if(password != passwordConf)
                return res.status(400).json({msg: 'Password & Confirm Password not matching.'})

            // password encryption
            const passwordHash = await bcrypt.hash(password, 10)
            
            const newUser = new Users({
                name, email, password: passwordHash, role
            })

            // save to database
            await newUser.save()

            // then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            // save a cookie in this particular path
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            // send access token
            res.json(accesstoken)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: 'User does not exists.'})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Incorrect Password.'})

            // If login success, create access token & refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            // save a cookie in this particular path
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            // send access token
            res.json(accesstoken)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged Out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshtoken: (req, res) => {
        try {
            // check cookie from '/user/refresh_token' path 
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please Login or Register."})
                const accesstoken = createAccessToken({id: user.id})
                
                // send access token
                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            if(!user) return res.status(400).json({msg: "User does not exist."})
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl