const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentModel = Schema({
     user_id : {
         type : String,
         require : true
     },
     name : {
        type : String,
        require : true,
        trim : true
     },
     email : {
        type : String,
        require : true,
        trim : true
     },
     paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Payments',paymentModel)