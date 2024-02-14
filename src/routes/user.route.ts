import express from 'express'
import { searchUsers } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').get(authMiddleware, searchUsers)
export default router
