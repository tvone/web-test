const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const authAdmin = require('../middleware/authAdmin')
const PaymentCtrl = require('../controllers/paymentCtrl')

router.get('/payment',verifyToken,authAdmin,PaymentCtrl.getPayment)

router.post('/create_payment',verifyToken,PaymentCtrl.createPayment)



module.exports = router