import express from 'express';
import { login, logout, refreshToken, register, } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request';
const router = express.Router();
router.route('/register').post(trimRequest.all, register);
router.route('/login').post(trimRequest.all, login);
router.route('/logout').get(trimRequest.all, logout);
router.route('/refreshToken').post(trimRequest.all, refreshToken);
export default router;
//# sourceMappingURL=auth.route.js.map