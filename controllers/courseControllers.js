import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { validationResult } from 'express-validator'
import { Course } from '../models/courses-models.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const coursesFilePath = resolve(__dirname, '../data/courses.json')
// Declare Jsonfirle have courses
// const courses = JSON.parse(fs.readFileSync(coursesFilePath,'utf-8'))


export const getAllCourses = async(req,res)=>{
const courses = await Course.find()
res.json(courses)
}


export const getSingleCourse = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.courseId);
        if(!course){
            res.status(404).json({message:"Courese Not Found"})
        }
        res.json(course)
    }catch{
        res.status(400).json({message:"Invalid Course Id"})
    }
}

export const addCourse = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    if(req.body){
        const newCourse = new Course(req.body)
        await newCourse.save()
        const courses = await course.find()
        fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2))

        res.status(201).json(newCourse)
    }
}

export const editCourse = async(req,res)=>{
    const courseId = req.params.courseId
    try{
        const updatedCourse = await Course.findByIdAndUpdate(courseId , req.body,{new:true});
        if(!updatedCourse){
            res.status(404).json({message:"Courese Not Found"})
        }
        const courses = await Course.find();
        fs.writeFileSync(coursesFilePath,JSON.stringify(courses,null,2))
        res.status(201).json(updatedCourse)
        }catch(error){
            res.status(400).json({erorr: error})
        }
}


export const removeCourse = async(req,res)=>{
    const courseId = req.params.courseId
    try{
        await Course.findByIdAndDelete(courseId)
        res.status(201).json("Deleted Succesfully By id:" + courseId)
        const courses = await Course.find();
        fs.writeFileSync(coursesFilePath,JSON.stringify(courses,null,2))

    }catch(err){
        res.status(400).json({message:"Invalid Course Id"})
    }

}