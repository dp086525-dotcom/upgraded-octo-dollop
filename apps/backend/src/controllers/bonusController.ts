import type { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { NutritionLog, ProgressEntry } from '../models/Gym.js';
import { TimetableSlot } from '../models/Study.js';

export async function streaks(req: Request, res: Response) {
  const [studyDays, gymDays] = await Promise.all([
    TimetableSlot.distinct('day', { user: req.userId }),
    NutritionLog.find({ user: req.userId }).sort({ date: -1 }).limit(14).select('date')
  ]);
  res.json({ studyConsistency: studyDays.length, gymConsistency: gymDays.length, message: 'Count-based streak starter ready for cron/event expansion.' });
}

export async function exportPdf(req: Request, res: Response) {
  const progress = await ProgressEntry.find({ user: req.userId }).sort({ date: -1 }).limit(5);
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=student-life-tracker.pdf');
  doc.pipe(res);
  doc.fontSize(22).text('Student Life Tracker Export');
  doc.moveDown().fontSize(14).text('Recent progress entries');
  progress.forEach((entry) => doc.text(`${entry.date.toDateString()} - ${entry.weightKg ?? 'N/A'} kg`));
  doc.end();
}
