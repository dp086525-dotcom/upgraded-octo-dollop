import { Router } from 'express';
import { exportPdf, streaks } from '../controllers/bonusController.js';
import * as reminders from '../controllers/reminderController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

export const bonusRoutes = Router();
bonusRoutes.use(requireAuth);
bonusRoutes.get('/reminders', asyncHandler(reminders.listReminders));
bonusRoutes.post('/reminders', asyncHandler(reminders.createReminder));
bonusRoutes.patch('/reminders/:id', asyncHandler(reminders.updateReminder));
bonusRoutes.delete('/reminders/:id', asyncHandler(reminders.deleteReminder));
bonusRoutes.get('/streaks', asyncHandler(streaks));
bonusRoutes.get('/export/pdf', asyncHandler(exportPdf));
