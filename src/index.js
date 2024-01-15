import mongoose from 'mongoose'
import app from './app.js'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import socketServer from './socket.server.js'

dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 8000

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('🚀 ~ Conected to mongodb')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true)
}

const server = app.listen(PORT, () => {
    console.log(`🚀 ~ Mode: ${process.env.NODE_ENV} ~ Running on port: ${PORT}`)
})

// SocketIO

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLINT_ENDPOINT,
    },
})

io.on('connection', (socket) => {
    console.info('Socket io connected successfully.')
    socketServer(socket, io)
})

// Error handling

process.on('uncaughtExeption', (err) => {
    console.error('Uncaught Exeption:', err)
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
})

process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Shutting down gracefully...')
    app.close(() => {
        console.log('Server gracefully closed.')
        process.exit(0)
    })
})
