import type { Request, Response } from 'express';
import { Reminder } from '../models/Reminder.js';

const owner = (req: Request) => ({ user: req.userId });

export async function listReminders(req: Request, res: Response) {
  res.json(await Reminder.find(owner(req)).sort({ remindAt: 1 }));
}
export async function createReminder(req: Request, res: Response) {
  res.status(201).json(await Reminder.create({ ...req.body, user: req.userId }));
}
export async function updateReminder(req: Request, res: Response) {
  res.json(await Reminder.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}
export async function deleteReminder(req: Request, res: Response) {
  await Reminder.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}
