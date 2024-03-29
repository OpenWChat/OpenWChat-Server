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
import routes from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from './utils/swagger.util.js'
import { serveSwaggerJson } from './configs/serveSwaggerJson.config.js'

const app: any = express()

// Middlewares

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

app.use('/api/v1', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.get('/swagger.json', serveSwaggerJson)

export default app
