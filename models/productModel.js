const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    product_id : {
        type : String,
        trim: true,
        require : true,
        unique : true
    },
    title : {
        type : String,
        trim : true,
        require : true
    },
    price : {
        type : Number,
        trim : true,
        require: true
    },
    description : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true
    },
    images : {
        type : Object,
        require : true
    },
    category : {
        type : String,
        require : true,
    },
    checked : {
        type : Boolean,
        default : false
    },
    sold : {
        type : Number,
        default : 0
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Products',productSchema)