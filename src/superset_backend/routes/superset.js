const express =  require('express')
const {getSupersetGuestToken} = require('../controllers/supersetController')
const {verifyToken} = require('../middlewares/authMiddleware')
const router =  express.Router()

router.get('/guest-token' , verifyToken, getSupersetGuestToken)
module.exports = router