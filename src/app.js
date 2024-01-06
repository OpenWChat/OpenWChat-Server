import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileupload from 'express-fileupload'
import cors from 'cors'
import createHttpError from 'http-errors'
import routes from './routes/index.js'

const app = express()

// Middlewares

app.use((err, _req, res) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(mongoSanitize())

app.use(cookieParser())

app.use(compression())

app.use(
    fileupload({
        useTempFiles: true,
    })
)

app.use(cors())

// Routes

app.use('/', () => console.log('object'))

// Error Handling

app.use(async (_err, _req, _res, next) => {
    next(createHttpError.NotFound('This route does not exist.'))
})

app.use(async (err, _req, res) => {
    res.status(err.status || 500)
    



    









    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

export default app
