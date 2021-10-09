const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authStudent = require('../middleware/authStudent')

// user account routings

router.post('/Register', userCtrl.register)

router.post('/login', userCtrl.login)

router.post('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshtoken)

router.get('/infor', auth, userCtrl.getUser)

router.patch('/enroll', auth, authStudent, userCtrl.enroll)



module.exports = router