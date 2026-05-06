import type { Request, Response } from 'express';
import { NutritionLog, ProgressEntry, Supplement, WorkoutPlan } from '../models/Gym.js';

const owner = (req: Request) => ({ user: req.userId });

export async function listNutrition(req: Request, res: Response) {
  res.json(await NutritionLog.find(owner(req)).sort({ date: -1 }).limit(30));
}

export async function upsertNutrition(req: Request, res: Response) {
  const date = new Date(req.body.date ?? new Date());
  const log = await NutritionLog.findOneAndUpdate(
    { ...owner(req), date: { $gte: new Date(date.toDateString()), $lt: new Date(date.getTime() + 86400000) } },
    { ...req.body, date, user: req.userId },
    { new: true, upsert: true }
  );
  res.status(201).json(log);
}

export async function nutritionHistory(req: Request, res: Response) {
  res.json(await NutritionLog.find(owner(req)).sort({ date: 1 }).limit(90));
}

export async function listSupplements(req: Request, res: Response) {
  res.json(await Supplement.find(owner(req)).sort({ createdAt: -1 }));
}

export async function createSupplement(req: Request, res: Response) {
  res.status(201).json(await Supplement.create({ ...req.body, user: req.userId }));
}

export async function updateSupplement(req: Request, res: Response) {
  res.json(await Supplement.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteSupplement(req: Request, res: Response) {
  await Supplement.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}

export async function listWorkouts(req: Request, res: Response) {
  res.json(await WorkoutPlan.find({ $or: [owner(req), { isTemplate: true }] }).sort({ isTemplate: -1, createdAt: -1 }));
}

export async function createWorkout(req: Request, res: Response) {
  res.status(201).json(await WorkoutPlan.create({ ...req.body, user: req.userId }));
}

export async function updateWorkout(req: Request, res: Response) {
  res.json(await WorkoutPlan.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteWorkout(req: Request, res: Response) {
  await WorkoutPlan.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}

export async function listProgress(req: Request, res: Response) {
  res.json(await ProgressEntry.find(owner(req)).sort({ date: -1 }).limit(60));
}

export async function createProgress(req: Request, res: Response) {
  res.status(201).json(await ProgressEntry.create({ ...req.body, user: req.userId }));
}

export async function uploadProgressPhoto(req: Request, res: Response) {
  const photo = { title: req.file?.originalname ?? 'Progress photo', url: `/uploads/${req.file?.filename}` };
  res.json(await ProgressEntry.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, { $push: { photos: photo } }, { new: true }));
}
