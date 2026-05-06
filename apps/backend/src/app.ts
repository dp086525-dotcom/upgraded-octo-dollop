import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { overview } from './controllers/dashboardController.js';
import { requireAuth } from './middleware/auth.js';
import { asyncHandler, errorHandler, notFound } from './middleware/error.js';
import { authRoutes } from './routes/authRoutes.js';
import { bonusRoutes } from './routes/bonusRoutes.js';
import { gymRoutes } from './routes/gymRoutes.js';
import { studyRoutes } from './routes/studyRoutes.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.get('/health', (_req, res) => res.json({ status: 'ok', app: 'Student Life Tracker' }));
app.use('/api/auth', authRoutes);
app.get('/api/dashboard/overview', requireAuth, asyncHandler(overview));
app.use('/api/study', studyRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api', bonusRoutes);
app.use(notFound);
app.use(errorHandler);
