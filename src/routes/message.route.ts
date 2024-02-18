import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { sendMessage, getMessages } from '../controllers/message.controller.js'
const router = express.Router()

/**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     tags: [Messages]
 *     summary: Send a message
 *     description: Send a message to a conversation.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               convo_id:
 *                 type: string
 *               message:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/').post(authMiddleware, sendMessage)

/**
 * @swagger
 *   get:
 *     tags: [Messages]
 *     summary: Get messages of a conversation
 *     description: Retrieve messages of a conversation by conversation ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: convo_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the conversation to retrieve messages from
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/:convo_id').get(authMiddleware, getMessages)

export default router
