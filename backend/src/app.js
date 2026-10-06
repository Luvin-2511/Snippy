import express, { urlencoded } from 'express'
import { connectToDB } from './config/db.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js'
import userRouter from './routes/user.route.js'
import chatRouter from './routes/chat.route.js'
import { errorHandler } from './middlewares/error.middleware.js'
import reelRouter from './routes/reel.route.js'
import http from 'http'
import { Server } from 'socket.io'
import { initializeSocket } from './socket/socket.js'

const app = express()
const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

initializeSocket(io)

// DB connection
await connectToDB()


// Middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

// Routes
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/reel', reelRouter)

// Global Error Handler
app.use(errorHandler)

export default httpServer
