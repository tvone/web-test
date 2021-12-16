const Users = require('../models/userModel')

const authAdmin = async (req,res,next)=>{
   try {
       const user = await Users.findOne({_id : req.user.id})

       if(user.role !== 1) return res.status(400).json({msg: "Admin mới có quyền truy cập"})

       next()
   } catch (error) {
       res.status(500).json({msg : error.message})
   }
}

module.exports = authAdmin