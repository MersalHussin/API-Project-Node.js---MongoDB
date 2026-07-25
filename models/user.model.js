import mongoose from 'mongoose'
import validator from 'validator'
import {userRoles} from '../utils/userRoles.js'

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
    },
    role:{
        type:String,
        enum:[userRoles.USER,userRoles.ADMIN,userRoles.MANGER],
        default:userRoles.USER
    },
    avatar:{
        type:String,
        default:'uploads/images.jpeg'
    }

})

const User = mongoose.model("User",userSchema)
export{User}
