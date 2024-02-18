import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import {
    createGroup,
    create_open_conversation,
    getConversations,
} from '../controllers/conversation.controller.js'
const router = express.Router()
/**
 * @swagger
 * /api/v1/conversations:
 *   post:
 *     tags: [Conversations]
 *     summary: Create or open a conversation
 *     description: Create or open a conversation with a user or group.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver_id:
 *                 type: string
 *               isGroup:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Conversation created/opened successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/').post(authMiddleware, create_open_conversation)

/**
 * @swagger
 *   get:
 *     tags: [Conversations]
 *     summary: Get user conversations
 *     description: Retrieve conversations associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversations retrieved successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/').get(authMiddleware, getConversations)

/**
 * @swagger
 * /api/v1/conversations/group:
 *   post:
 *     tags: [Conversations]
 *     summary: Create a group conversation
 *     description: Create a group conversation with multiple users.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Group conversation created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/group').post(authMiddleware, createGroup)

export default router
