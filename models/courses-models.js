import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
})

const Course = mongoose.model('course',courseSchema)
export{
    Course
} 