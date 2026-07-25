import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { validationResult } from 'express-validator'
import { Course } from '../models/courses-models.js'
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatus.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const coursesFilePath = resolve(__dirname, '../data/courses.json')
// Declare Jsonfirle have courses
// const courses = JSON.parse(fs.readFileSync(coursesFilePath,'utf-8'))


export const getAllCourses = async(req,res)=>{
const query = req.query
console.log(query);

const limit = query.limit || 10
const page = query.page || 1
const skip = (page - 1) * limit
const courses = await Course.find({},{"__v":false ,"name":false}).limit(limit).skip(skip)
try{
    // JSEND
    res.json( {status:SUCCESS ,data: {courses}})
}catch(err){
        res.status(400).json({status:FAIL ,message: err})
}
}


export const getSingleCourse = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.courseId);
        if(!course){
            res.status(404).json({status:FAIL ,data:'Course Not Found'})
        }
        res.json({status:SUCCESS ,data: {course}})
    }catch(err){
            res.status(400).json({status:FAIL ,message: err})
    }
}

export const addCourse = async(req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:FAIL ,data:null, errors:errors.array()})
        }
        if(req.body){
            const newCourse = new Course(req.body)
            await newCourse.save()
            const courses = await Course.find()
            fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2))
            res.status(201).json({status:SUCCESS,data: {newCourse}})
        }
    }catch(err){
        res.status(400).json({status:FAIL ,message: err})
    }
}

export const editCourse = async(req,res)=>{
    const courseId = req.params.courseId
    try{
        const updatedCourse = await Course.findByIdAndUpdate(courseId , req.body,{new:true} );
        if(!updatedCourse){
            res.status(404).json({status:FAIL ,data:"Courese Not Found"} )
        }
        const courses = await Course.find();
        fs.writeFileSync(coursesFilePath,JSON.stringify(courses,null,2))
        res.status(201).json({status:SUCCESS ,data: {updatedCourse}})
        }catch(err){
            res.status(400).json({status:FAIL ,message: err})
        }
}


export const removeCourse = async(req,res)=>{
    const courseId = req.params.courseId
    try{
        const course = await Course.findByIdAndDelete(courseId)
        if(!course){
            res.status(404).json({status:FAIL, data:"Course Not Found"})
        }
        res.status(201).json({status:SUCCESS ,data: `Deleted Succesfully By id: ${courseId}`})
        const courses = await Course.find();
        fs.writeFileSync(coursesFilePath,JSON.stringify(courses,null,2))

        
    }catch(err){
        res.status(400).json({status:FAIL, message:err})
    }

}