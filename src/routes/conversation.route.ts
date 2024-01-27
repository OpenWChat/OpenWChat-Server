import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {
    createGroup,
    create_open_conversation,
    getConversations,
} from '../controllers/conversation.controller.js'
const router = express.Router()

router.route('/').post(authMiddleware, create_open_conversation)
router.route('/').get(authMiddleware, getConversations)
router.route('/group').post(authMiddleware, createGroup)

export default router
