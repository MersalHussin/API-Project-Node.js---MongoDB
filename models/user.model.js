import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    fristName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'faild must be a valid Email Adress']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type: String,
        required:true
    }

})

const User = mongoose.model("User",userSchema)
export{User}
