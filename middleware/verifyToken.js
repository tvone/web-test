const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    try {
        const token = req.header("Authorization")

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(!token) return res.status(400).json({msg: "Thông tin xác thực chưa đúng !"})

            req.user = user
            
            next()
        })
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

module.exports = verifyToken