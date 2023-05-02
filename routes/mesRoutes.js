import express from 'express';

import { getMessages, sendMessage, deleteMessage, updateMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', sendMessage);
router.delete('/delete', deleteMessage);
router.put('/update', updateMessage);

export default router;