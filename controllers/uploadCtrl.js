const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})
const removeTmp = (path)=>{
   fs.unlink(path,error =>{
       if(error) throw error
   })
}
const uploadCtrl = {
    uploadAvatar :  (req,res)=>{
      try {
          const file = req.files.file
           cloudinary.uploader.upload(file.tempFilePath,{
               folder: 'Avatar',width : 150,height : 150,crop : 'fill'
           },async (err,response)=>{
               if(err)  throw err
               removeTmp(file.tempFilePath)
               console.log(response)
               res.json({url : response.secure_url})
               
           })
      } catch (error) {
          res.status(500).json({msg : error.message})
      }
    },
    uploadProduct : (req,res)=>{
        try {
        const file = req.files.file
        cloudinary.uploader.upload(file.tempFilePath,{
            folder : "Product"
        },async (error,response)=>{
            if(error) throw error
            res.json({public_id : response.public_id,url : response.secure_url})
        })
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
        
    },
    removeProduct : (req,res) =>{
        try {
            const {public_id} = req.body
            console.log(public_id)
        if(!public_id) res.status(400).json({msg : "Không có hình ảnh nào được thêm !"})

        cloudinary.uploader.destroy(public_id, async(err,response)=>{
            if(err) throw err
            res.json({msg : "Đã xóa hình ảnh "})
        })
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
        
    }
}

module.exports = uploadCtrl