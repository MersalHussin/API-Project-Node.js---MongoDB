import express from 'express'
import courseRouter from './routes/coursesRoutes.js'
import usersRouter from './routes/usersRoutes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ERROR } from './utils/httpStatus.js'
import cors from 'cors'
dotenv.config()
const app = express()
const url = process.env.MONGO_URL;
// Cors to use at borwser Cross Orign Resource Shearing in(not working in the not same port)
app.use(cors())

// Middleware to use request.body
app.use(express.json())

app.use('/api/courses', courseRouter)
app.use('/api/users', usersRouter)



app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000')
})



mongoose.connect(url, { dbName: 'Mersal' })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message)
    })


    // Global Middleware for not found routes
    app.use((req, res) => {
    res.status(404).json({ status: ERROR, message: 'This Resource is not Avilable' })
})