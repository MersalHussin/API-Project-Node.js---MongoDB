import { FAIL } from "../utils/httpStatus.js"

export const allowedTo = (...roles)=> {
    return (req,res,next)=>{
       const currnetUserRole = req.currnetUser.role
       if(!roles.includes(currnetUserRole)){
        return next(res.json({"status": FAIL, "message":'This Role an Authorized'}) )
       }
            
        next()
    }
}