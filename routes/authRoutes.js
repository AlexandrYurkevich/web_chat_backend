import express from 'express';

import { tryLogin, tryRegister } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', tryRegister);
router.post('/login', tryLogin);

export default router;