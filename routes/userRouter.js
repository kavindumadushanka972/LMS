const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

router.post('/Register', userCtrl.register)
router.get('/refresh_token', userCtrl.refreshtoken)


module.exports = router