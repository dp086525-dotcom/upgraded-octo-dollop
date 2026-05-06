import type { Request, Response } from 'express';
import { Exam, TimetableSlot } from '../models/Study.js';
import { NutritionLog, ProgressEntry, WorkoutPlan } from '../models/Gym.js';
import { Reminder } from '../models/Reminder.js';

function todayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export async function overview(req: Request, res: Response) {
  const { start, end } = todayRange();
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
  const [todayLectures, upcomingExams, nutrition, workout, reminders, progress] = await Promise.all([
    TimetableSlot.find({ user: req.userId, day }).sort({ startTime: 1 }).limit(5),
    Exam.find({ user: req.userId, examDate: { $gte: start } }).populate('subject', 'name').sort({ examDate: 1 }).limit(4),
    NutritionLog.findOne({ user: req.userId, date: { $gte: start, $lt: end } }),
    WorkoutPlan.findOne({ $or: [{ user: req.userId }, { isTemplate: true }] }).sort({ updatedAt: -1 }),
    Reminder.find({ user: req.userId, remindAt: { $gte: start }, done: false }).sort({ remindAt: 1 }).limit(5),
    ProgressEntry.find({ user: req.userId }).sort({ date: -1 }).limit(7)
  ]);

  res.json({ todayLectures, upcomingExams, nutrition, workout, reminders, progress });
}
