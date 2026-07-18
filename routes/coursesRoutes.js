import express from 'express'
import { addCourse, editCourse, getAllCourses, getSingleCourse, removeCourse } from '../controllers/courseControllers.js'
import {bodyValidation} from '../middlewares/validationSchema.js'
const router = express.Router()

// عندنا خاصية الـ route داخل الrouter بتخليني اني اعمل كذا method في Route واح

// Get Home page
router.get('/home',(req,res)=>{
res.send("HEllo owrld")
})

// ===== الطريقة القديمة =====
// // Get All Courses
// router.get('/',getAllCourses)

// // Get 1 Course
// router.get('/:courseId',getSingleCourse)

// // Post Course
// router.post('/',bodyValidation(),addCourse)

// // Edit Course
// router.patch('/:courseId',editCourse)

// // Delete Course
// router.delete('/:courseId',removeCourse)



router.route('/')
// Get All Courses
    .get(getAllCourses)
// Post Course
    .post(bodyValidation(),addCourse)


router.route('/:courseId')
    // Get 1 Course
    .get(getSingleCourse)
    // Edit Course
    .patch(editCourse)
    // Delete Course
    .delete(removeCourse)

export default router
