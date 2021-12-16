const express = require('express')
const uploadCtrl = require('../controllers/uploadCtrl')
const router = express.Router()
const uploadIMG = require('../middleware/uploadIMG')
const verifyToken = require('../middleware/verifyToken')
const authAdmin = require('../middleware/authAdmin')

router.post('/upload_avatar',verifyToken, uploadIMG,uploadCtrl.uploadAvatar)

router.post('/upload_product',verifyToken,uploadIMG,uploadCtrl.uploadProduct)

router.post('/remove_product',verifyToken,authAdmin,uploadCtrl.removeProduct)

module.exports = router