import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import taskRote from './routes/taskRoute.js'

dotenv.config()

// Initialize the app
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/tasks', taskRote)

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected Successfully!')
  })
  .catch((err) => {
    console.log('Database connected Error', err)
  })

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})
