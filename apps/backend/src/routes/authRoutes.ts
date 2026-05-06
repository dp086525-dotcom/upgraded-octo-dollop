import { Router } from 'express';
import { login, me, signup } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

export const authRoutes = Router();
authRoutes.post('/signup', asyncHandler(signup));
authRoutes.post('/login', asyncHandler(login));
authRoutes.get('/me', requireAuth, asyncHandler(me));
