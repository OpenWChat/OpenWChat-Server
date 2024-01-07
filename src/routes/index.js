import express from 'express'
import authRoutes from './auth.route.js'
import conversationRoutes from './conversation.route.js'
import MessageRoutes from './message.route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/conversation', conversationRoutes)
router.use('/message', MessageRoutes)

export default router
