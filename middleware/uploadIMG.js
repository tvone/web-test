const fs = require('fs')

const uploadIMG = (req,res,next)=>{
    try {
        
       if(!req.files || Object.keys(req.files).length === 0){
           return res.status(400).json({msg: 'Không có tệp nào được tải lên!'})
        }
        const file = req.files.file
        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg : "Kích thước tệp quá lớn !"})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return res.status(400).json({msg : "Định dạng tệp không hợp lệ !"})
        }
        next()
       
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const removeTmp = (path)=>{
    fs.unlink(path,error=>{
        if(error) throw error
    })
}

module.exports = uploadIMG

