var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userCtrl')
const verifyToken = require('../middleware/verifyToken')
const authAdmin = require('../middleware/authAdmin')

router.post('/register',userCtrl.register)

router.post('/activate',userCtrl.activateEmail)

router.post('/login',userCtrl.login)

router.post('/refresh_token',userCtrl.getAccessToken)

// Forgot passowrd
router.post('/forgot_password',userCtrl.forgotPassword)

// Reset password
router.post('/reset',verifyToken,userCtrl.resetPassword)

// Get Info
router.get('/info',verifyToken,userCtrl.getInfo)

// Get All Info
router.get('/all_info',verifyToken,authAdmin,userCtrl.getAllInfo)

// Logout:
router.get('/logout',userCtrl.logout)

// Update Info :
router.patch('/update_info',verifyToken,userCtrl.updateInfo)

// Update Role :
router.patch('/update_role/:id',verifyToken,authAdmin,userCtrl.updateRole)

// Delete User:
router.delete('/delete_user/:id',verifyToken,authAdmin,userCtrl.deleteUser)

// Add to cart :
router.patch('/addCart',verifyToken,userCtrl.addToCart)

// History Payment :
router.get('/history',verifyToken,userCtrl.history)

// Get All History :
router.get('/all_history',verifyToken,authAdmin,userCtrl.getAllHistory)





module.exports = router;
