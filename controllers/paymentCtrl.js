const Users = require('../models/userModel')
const Products = require('../models/productModel')
const Payments = require('../models/paymentModel')

const PaymentCtrl ={
    getPayment : async (req,res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    },
    createPayment : async (req,res) =>{
      try {
          const user = await Users.findById(req.user.id).select('name email')

          if(!user) return res.status(400).json({msg : "Bạn chưa đăng nhập,vui lòng đăng nhập"})

          const {_id,name,email} = user

          const {cart,address,paymentID} = req.body

          const newPayment = new Payments ({
              user_id : _id,name,email,cart,address,paymentID
          })
          
          cart.filter(item=>{
             return sold(item._id,item.quantity,item.sold)
          })
 
          newPayment.save()

          res.json(newPayment)
          

      } catch (error) {
          res.status(500).json({msg : error.message})
      }
    }


}

const sold = async (id,quantity,oldSold)=>{
   await Products.findOneAndUpdate({_id : id},{
       sold : quantity + oldSold
   })
}

module.exports = PaymentCtrl