const express = require('express')
const ProductCtrl = require('../controllers/productCtrl')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const authAdmin = require('../middleware/authAdmin')

router.get('/product',ProductCtrl.getProducts)

router.post('/create_product',verifyToken,authAdmin,ProductCtrl.createProduct)

router.put('/update_product/:id',verifyToken,authAdmin,ProductCtrl.updateProduct)

router.delete('/delete_product/:id',verifyToken,authAdmin,ProductCtrl.deleteProduct)

module.exports = router