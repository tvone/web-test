const Category = require('../models/categoryModel')


const CategoryCtrl = {
   getCategories : async (req,res)=>{
       try {
           const categories = await Category.find()
           res.json(categories)
       } catch (error) {
           res.status(500).json({msg: error.message})
       }
   },
   createCategory : async (req,res)=>{
       try {
           const {name}= req.body
           if(!name) res.status(400).json({msg : 'Vui lòng nhập đầy đủ thông tin'})
        //    Check category
           const category = await Category.findOne({name})

           if(category) return res.status(400).json({msg: "Danh mục này đã tồn tại !"})

           const newCategory = new Category({
               name
           })
           await newCategory.save()
           res.json({msg: `Tạo thành công ${name}`})
       } catch (error) {
           res.status(500).json({msg : error.message})
       }
   },
   updateCategory : async (req,res)=>{
       try {
           const {name} = req.body
           if(!name) return res.status(400).json({msg : 'Vui lòng nhập đầy đủ thông tin'})
           const category = await Category.findOneAndUpdate({_id : req.params.id},{
               name
           })
           res.json({msg : `Cập nhật thành công ${name}`})
       } catch (error) {
           res.status(500).json({msg : error.message})
       }
   },
   deleteCategory : async (req,res) =>{
       try {
         
           await Category.findOneAndDelete({_id : req.params.id})
           res.json({msg : `Xóa thành công ${req.params.id}`})
       } catch (error) {
           res.status(500).json({msg: error.message})
       }
   }
}

module.exports = CategoryCtrl