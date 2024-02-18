import { type Request, type Response } from 'express'
import { specs } from '../utils/swagger.util.js'

export const serveSwaggerJson = (_req: Request, res: Response): any => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
}
