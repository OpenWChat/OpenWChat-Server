import express from 'express'
import {
    login,
    logout,
    refreshToken,
    register,
} from '../controllers/auth.controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/v1/auth/register:
 *     post:
 *         tags: [Authentication]
 *         summary: Register a new user
 *         description: Register a new user with name, email, picture, status, and password.
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             name:
 *                                 type: string
 *                             email:
 *                                 type: string
 *                             picture:
 *                                 type: string
 *                             status:
 *                                 type: string
 *                             password:
 *                                 type: string
 *         responses:
 *             200:
 *                 description: Registration successful
 *             400:
 *                 description: Bad Request
 *             500:
 *                 description: Internal Server Error
 */
router.post('/register', register)
// router.route('/register').post(register)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login as a user
 *     description: Login using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.route('/login').post(login)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags: [Authentication]
 *     summary: Logout the current user
 *     description: Logout the currently authenticated user.
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal Server Error
 */
router.route('/logout').get(logout)

/**
 * @swagger
 * /api/v1/auth/refreshToken:
 *   post:
 *     tags: [Authentication]
 *     summary: Refresh authentication token
 *     description: Refresh the authentication token using a refresh token.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.route('/refreshToken').post(refreshToken)

export default router
