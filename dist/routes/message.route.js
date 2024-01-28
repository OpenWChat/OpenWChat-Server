import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
const router = express.Router();
router.route('/').post(authMiddleware, sendMessage);
router.route('/:convo_id').get(authMiddleware, getMessages);
export default router;
//# sourceMappingURL=message.route.js.map