import express from 'express'
import courseRouter from './routes/coursesRoutes.js'
import mongoose from 'mongoose'
const app = express()
const url = 'mongodb://mersalhussin_db_user:WAGleNVhc0eWmtai@ac-cdsjk3r-shard-00-00.iqgoxr5.mongodb.net:27017,ac-cdsjk3r-shard-00-01.iqgoxr5.mongodb.net:27017,ac-cdsjk3r-shard-00-02.iqgoxr5.mongodb.net:27017/?ssl=true&replicaSet=atlas-1112pm-shard-0&authSource=admin&retryWrites=true&w=majority';
// Middleware to use request.body
app.use(express.json())

app.use('/api/courses', courseRouter)

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})

mongoose.connect(url, { dbName: 'Mersal' })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message)
    })