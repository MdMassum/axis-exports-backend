const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    phone:{
        type:String,
        required:[true,"Please Enter Phone No"],
    },
    country:{
        type:String,
    },
    product:{
        type:String,

    },
    message:{
        type:String,
        required:[true,"Please Enter Message"]
    } 
  
},{timestamps:true})

module.exports = mongoose.model('Contact',contactSchema)