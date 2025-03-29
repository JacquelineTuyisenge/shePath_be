import express from 'express';
import { sendMessage, getMessages, getMessage } from '../controllers/message.controller';
import { isAdmin, authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateUser, sendMessage);
router.get('/', isAdmin, getMessages);
router.get('/:id', isAdmin, getMessage)

export default router;