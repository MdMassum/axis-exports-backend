const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true  //removes white space
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:{
        type:[String],
        default:[]
    },
    category:{
        type:String,
        // required:[true,"Please Enter Product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product category"],
        maxLength:[4,"Stock cannot Exceed 4 digits"],
        default:10
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{  // this store the user who will create the particular product or map
                type:mongoose.Schema.ObjectId,
                ref : "User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],
    user:{  // this store the user who will create the particular product or map
        type:mongoose.Schema.ObjectId,
        ref : "User",
        // required:true,
    }
},{timestamps:true})
module.exports = mongoose.model('Product',productSchema)