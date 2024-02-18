import express from 'express'
import { searchUsers } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
const router = express.Router()

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Search users
 *     description: Search users based on a keyword.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search for users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/').get(authMiddleware, searchUsers)

export default router
