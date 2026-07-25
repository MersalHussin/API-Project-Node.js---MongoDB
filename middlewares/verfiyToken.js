import jwt from 'jsonwebtoken'
import { FAIL } from '../utils/httpStatus.js';


export const verfiyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    if(!authHeader){
        return res.status(401).json({status:FAIL, message:"token is Required"})
    }
    const token = authHeader.split(' ')[1];
    try{
        const decodedToken  = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log("Currnet User",decodedToken);
        req.currnetUser = decodedToken

        next()
    }catch{ 
        return res.status(401).json({status:FAIL, message:"Unauthorized"})
    }
        

}