import express from 'express'
import { getAllUsers, login, register} from '../controllers/usersControllers.js'
import {bodyValidation} from '../middlewares/validationSchema.js'
const router = express.Router()

// عندنا خاصية الـ route داخل الrouter بتخليني اني اعمل كذا method في Route واح

// Get Home page
router.get('/home',(req,res)=>{
res.send("HEllo owrld")
})

// Get All Users
// Register 
// Login
router.route('/')
    .get(getAllUsers)
router.route('/register')
    .post(register)
router.route('/login')
    .post(login)

export default router
