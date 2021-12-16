const Product = require('../models/productModel')


class APIfeatures {
    constructor(query,queryString){
        this.query = query // product find
        this.queryString = queryString // req.query
    }

    filtering(){
      const queryObj = {...this.queryString}

      console.log(queryObj)

      const excludedFields = ['page','sort','limit']
      excludedFields.forEach(el => delete(queryObj[el]))
      console.log(queryObj)

      let queryStr = JSON.stringify(queryObj)

      console.log("before" +queryStr)

      queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$'+ match)
 

      this.query.find(JSON.parse(queryStr))
      console.log("after" + queryStr)

      return this
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
           
        }else{
            this.query = this.query.sort('-createdAt')
        }
      return this
      
    }

    paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 12
      const skip = (page - 1) * limit
      this.query = this.query.skip(skip).limit(limit)

      return this
    }
}


const ProductCtrl = {
   getProducts : async (req,res)=>{
       try {
           const features = new APIfeatures(Product.find(),req.query).filtering().sorting().paginating()
           const products = await features.query
           res.json({
               status : 'success',
               result : products.length,
               products : products,
               totalPage : Math.ceil( await Product.countDocuments() / products.length)
               
           })
       } catch (error) {
           res.status(500).json({msg: error.message})
       }
   },
   createProduct : async (req,res) =>{
     try {
         const {product_id,title,price,description,content,images,category} = req.body

         if(!images) return res.status(400).json({msg : 'Không có hình ảnh nào được cập nhật'})

         const product = await Product.findOne({product_id})

         if(product) return res.status(400).json({msg : 'Sản phẩm này đã tồn tại'})

         const newProduct = new Product({
             product_id,title : title.toLowerCase(),price,description,content,images,category
         })

          await newProduct.save()

         res.json({msg : `Tạo thành công sản phẩm ${title}`})
     } catch (error) {
         res.status(500).json({msg : error.message})
     }
   },
   updateProduct : async (req,res) =>{
       try {
           const {product_id,title,price,description,content,images,category} = req.body
      
           if(!images) return res.status(400).json({msg : "Không có hình ảnh nào được cập nhật"})

           const product = await Product.findOneAndUpdate({_id : req.params.id},{
               product_id, title : title.toLowerCase(),price,description,content,images,category
           })

           res.json({msg : 'Cập nhật thành công'})
       } catch (error) {
           res.status(500).json({msg : error.message})
       }
   },
   deleteProduct : async (req,res)=>{
      try {
          await Product.findOneAndDelete({_id : req.params.id})

          res.json({msg : 'Xoa ok'})
      } catch (error) {
          res.status(500).json({msg : error.message})
      }
   }
}

module.exports = ProductCtrl