import { User } from '../models/user.model.js'
import { generateJWT } from '../utils/generateJWT.js'
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatus.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const getAllUsers = async(req,res)=>{
const query = req.query
console.log(query);

const limit = query.limit || 10
const page = query.page || 1
const skip = (page - 1) * limit
const users = await User.find({},{'__v':false,'password':false}).limit(limit).skip(skip)
try{
    // JSEND
    res.json( {status:SUCCESS ,data: {users}})
}catch(err){
        res.status(400).json({status:FAIL ,message: err})
}
}

export const login = async(req, res)=>{
    const {email, password} = req.body
    console.log(email,password);
    try{
        if(!email || !password){
            return res.status(400).json({status:FAIL, message: "email and password are required"})
        }
        const user = await User.findOne({email:email})
        const matchedPassword = await bcrypt.compare(password, user.password)        

        if(user && matchedPassword){
            // Logged in Succesfully
        const token =  generateJWT({email,id:user._id})

            return res.status(200).json({status:SUCCESS, data:token})
        }else{
            return res.status(400).json({status:FAIL, message:"email or password is incorrect"})
        }
        
    }catch(err){
        res.status(400).json({status:FAIL, message: err})
    }
    }

export const register = async(req,res) =>{
    const {fristName,lastName,email,password} = req.body   
    try{

        
        // passwoord hasing
        
        const hashedPassowrd = await bcrypt.hash(password,15)
        
        const oldUser = await User.findOne({email:email})
        if(oldUser){ return res.status(400).json({status:FAIL, data: `user with email ${email} already exists`})}
        const newUser = new User({fristName,lastName,email,password:hashedPassowrd})
        
        const token =  generateJWT({email,id:newUser._id})

        newUser.token= token

        await newUser.save()
        
        res.status(200).json({status:SUCCESS, data:{user:newUser}})
    }catch(err){
                res.status(400).json({status:FAIL, message: err})

    }

}
