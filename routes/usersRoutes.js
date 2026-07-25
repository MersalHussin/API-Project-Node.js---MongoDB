import express from 'express'
import { getAllUsers, login, register} from '../controllers/usersControllers.js'
import {bodyValidation} from '../middlewares/validationSchema.js'
import {verfiyToken} from '../middlewares/verfiyToken.js'
const router = express.Router()
import multer  from 'multer'



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './uploads/')
    },
    filename: (req, file,cb) =>{
        const ext = file.mimetype.split('/')[1]
        cb(null, `Profile-${Date.now()}.${ext}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.split('/')[0] == 'image'){
        cb(null,true)
    }else{
        cb("This Extintion is not supported",false)
    }
}

const upload = multer({ storage ,fileFilter})
// عندنا خاصية الـ route داخل الrouter بتخليني اني اعمل كذا method في Route واح

// Get Home page
router.get('/home',(req,res)=>{
res.send("HEllo owrld")
})

// Get All Users
// Register 
// Login
router.route('/')
    .get(verfiyToken,getAllUsers)
router.route('/register')
    .post(upload.single('avatar'),register)
router.route('/login')
    .post(login)

export default router
