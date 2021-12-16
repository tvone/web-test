const Users = require('../models/userModel')
const Payments = require('../models/paymentModel')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
require('dotenv').config()
const sendEmail = require('../controllers/sendMail')

const userCtrl = {
    register : async (req,res)=>{
        try {
            // Req.body:
            const {name,email,password,cf_password} = req.body
            
            // Check body:
            if(!name || !email || !password || !cf_password)
            return res.status(400).json({msg: 'Vui lòng nhập đầy đủ thông tin'})

            // Check email:
            if(!validateEmail(email))
            return res.status(400).json({msg : 'Định dạng email chưa chính xác'})

            // Find user:
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: 'Email đã tồn tại !'})

            //  Check password:
            if(password.length < 6) return res.status(400).json({msg: 'Mật khẩu phải lớn hơn 6 kí tự !'})
            if(password !== cf_password) return res.status(400).json({msg: 'Mật khẩu chưa khớp nhau !'})
            

            // All good:
            const hashedPassword = await argon2.hash(password)
            
            
            console.log(hashedPassword)
             
            const newUser = {
                name,email,
                password : hashedPassword
            }

            const activation_token = createActivationToken(newUser)

            const url = `${process.env.CLIENT_URL}/user/activation/${activation_token}`
            const txt = "Xác minh Email"
            sendEmail(email,url,txt)
             
            // Đăng kí ko cần gửi email:
            // const newUser = new Users({
            //     name,password:hashedPassword,email
            // })
            // await newUser.save()
            

            res.json({msg : "Đăng kí thành công vui lòng kiểm tra email !"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    activateEmail : async (req,res)=>{
        try {
        const {activation_token} = req.body

        console.log(activation_token)

        const user = jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET)

        if(!user) return res.status(400).json({msg: 'Thong tin chua dung'})

        const {name,password ,email} = user

        const checkEmail = await Users.findOne({email})

        if(checkEmail) return res.status(400).json({msg: "Email này đã được đăng kí"})

        const newUser = new Users({
            name,password,email
        })
        await newUser.save()

        res.json({msg: "Tài khoản của bạn đã được kích hoạt"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
        
    },
    login : async (req,res)=>{
        try {
        const {email,password} = req.body
        console.log(email,password)
        // Check login: 
        if(!email || !password) return res.status(400).json({msg: 'Vui lòng nhập đủ thông tin'})

        const user = await Users.findOne({email})

        if(!user) return res.status(400).json({msg: "Tài khoản chưa được đăng kí"})

        const passwordValid = await argon2.verify(user.password,password)
        
        if(!passwordValid) return res.status(400).json({msg : "Tài khoản hoặc mật khẩu chưa chính xác"})

        const refresh_token = createRefreshToken({id : user._id})

        res.cookie('refreshtoken',refresh_token,{
            httpOnly : true,
            path : '/user/refresh_token',
            maxAge : 7 * 24 * 60 * 60 * 1000 //7d
        })
        res.json({msg: 'Đăng nhập thành công'})
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
        
    },
    getAccessToken : async (req,res) =>{
        try {
            const rf_token = req.cookies.refreshtoken

        if(!rf_token) return res.status(400).json({msg : "Bạn chưa đăng nhập,vui lòng đăng nhập"})

        jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg: 'Bạn chưa đăng nhập,vui lòng đăng nhập'})


            const access_token = createAccessToken({id : user.id})

            res.json({access_token})
        })
        } catch (error) {
            res.status(500).json({msg : error.message})
        }  
    },
    forgotPassword : async (req,res)=>{
        try {
            const {email} = req.body

            if(!validateEmail(email)) return res.status(400).json({msg : "Vui lòng nhập đúng định dạng email"})
            
            // Check email:
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg : "Tài khoản chưa được đăng kí"})

            const access_token = createAccessToken({id : user._id})

            const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`
            const txt = "Xác nhận thay đổi mật khẩu"

            sendEmail(email,url,txt)

            res.json({msg: 'Chúng tôi đã gửi thông tin tới email của bạn,vui lòng kiểm tra email'})
           
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    resetPassword : async (req,res)=>{
        try {
            const {password,cf_password} = req.body

            if(password.length < 6) return res.status(400).json({msg: "Mật khẩu phải có ít nhất 6 kí tự"})

            if(password !== cf_password) return res.status(400).json({msg: "Mật khẩu chưa khớp nhau"})
            
            const hashedPassword = await argon2.hash(password)

            const user = await Users.findOneAndUpdate({_id : req.user.id},{
                password : hashedPassword
            })

            res.json({msg: "Thay đổi mật khẩu thành công"})

        } catch (error) {
            res.status(400).json({msg : error.message})
        }
    },
    getInfo : async (req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (error) {
            res.status(500.).json({msg: error.message})
        }
    },
    getAllInfo : async (req,res)=>{
        try {
            const PAGE_SIZE = 3
            const page = parseInt(req.query.page || '1')
            const total = await Users.countDocuments()
            const users = await Users.find().select('-password')
            .limit(PAGE_SIZE)
            .skip((PAGE_SIZE * page) - PAGE_SIZE)
            const totalPage = Math.ceil(total / PAGE_SIZE)
           
            res.json({users : users,totalPage,total})
            
           
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    logout : async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path : '/user/refresh_token'})
            return res.json({msg: 'Đăng xuất thành công'})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updateInfo : async (req,res)=>{
        try {
            const {name,avatar} = req.body
            // if(!name || !avatar) return res.status(400).json({msg :'Vui lòng nhập đầy đủ thông tin'})
            const user = await Users.findByIdAndUpdate({_id : req.user.id},{
                name,avatar
            })
            res.json({msg: 'Cập nhật thông tin thành công'})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updateRole : async(req,res)=>{
        try {
            const {role} = req.body
            const user = await Users.findOneAndUpdate({_id: req.params.id},{
                role
            })
            res.json({msg: 'Cập nhật thông tin thành công'})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    deleteUser : async (req,res)=>{
        try {
             const user = await Users.findOneAndDelete({_id : req.params.id})
            res.json({msg: `Xóa thành công user có id : ${req.params.id}`})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    addToCart : async (req,res)=>{
        try { 
            const user = await Users.findById(req.user.id)

            if(!user) return res.status(400).json({msg : "Bạn chưa đăng nhập !"})

            await Users.findOneAndUpdate({_id : req.user.id},{
                cart : req.body.cart
            })
            return res.json({msg : "Thêm thành công sản phẩm"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    history : async (req,res) =>{
       try {
            const history = await Payments.find({user_id : req.user.id})
            
            res.json(history)
       } catch (error) {
           res.status(500).json({msg : error.message})
       }
    },
    getAllHistory : async (req,res)=>{
        try {
            const histories = await Payments.find()
            
            res.json(histories)
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    }
    
}







//Check email JS : 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ACTIVATION TOKEN:
const createActivationToken = payload =>{
    return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET,{expiresIn : '5m'})
}

// ACCESS TOKEN :
const createAccessToken = payload =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '15m'})
}

// REFRESH TOKEN :
const createRefreshToken = payload =>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn : '7d'})
}

module.exports = userCtrl