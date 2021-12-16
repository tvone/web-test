const express = require('express')
const router = express.Router()
const CategoryCtrl = require('../controllers/categoryCtrl')
const verifyToken = require('../middleware/verifyToken')
const authAdmin = require('../middleware/authAdmin')

router.get('/category',CategoryCtrl.getCategories)

router.post('/create_category',verifyToken,authAdmin,CategoryCtrl.createCategory)

router.put('/update_category/:id',verifyToken,authAdmin,CategoryCtrl.updateCategory)

router.delete('/delete_category/:id',verifyToken,authAdmin,CategoryCtrl.deleteCategory)





module.exports = router