import type { Request, Response } from 'express';
import { Exam, Semester, Subject, TimetableSlot } from '../models/Study.js';

const owner = (req: Request) => ({ user: req.userId });

export async function listSemesters(req: Request, res: Response) {
  const semesters = await Semester.find(owner(req)).sort({ createdAt: -1 });
  res.json(semesters);
}

export async function createSemester(req: Request, res: Response) {
  res.status(201).json(await Semester.create({ ...req.body, user: req.userId }));
}

export async function updateSemester(req: Request, res: Response) {
  res.json(await Semester.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteSemester(req: Request, res: Response) {
  await Semester.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}

export async function listSubjects(req: Request, res: Response) {
  const filter = req.query.semester ? { ...owner(req), semester: req.query.semester } : owner(req);
  res.json(await Subject.find(filter).populate('semester', 'name').sort({ createdAt: -1 }));
}

export async function createSubject(req: Request, res: Response) {
  res.status(201).json(await Subject.create({ ...req.body, user: req.userId }));
}

export async function updateSubject(req: Request, res: Response) {
  res.json(await Subject.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteSubject(req: Request, res: Response) {
  await Subject.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}

export async function uploadSyllabus(req: Request, res: Response) {
  const syllabus = { title: req.file?.originalname ?? req.body.title, url: req.file ? `/uploads/${req.file.filename}` : req.body.url, kind: req.file ? 'pdf' : 'text' };
  res.json(await Subject.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, { syllabus }, { new: true }));
}

export async function uploadNotes(req: Request, res: Response) {
  const note = { title: req.file?.originalname ?? req.body.title, url: req.file ? `/uploads/${req.file.filename}` : req.body.url, kind: req.file ? 'pdf' : 'text' };
  res.json(await Subject.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, { $push: { notes: note } }, { new: true }));
}

export async function listExams(req: Request, res: Response) {
  res.json(await Exam.find(owner(req)).populate('subject', 'name code').sort({ examDate: 1 }));
}

export async function createExam(req: Request, res: Response) {
  res.status(201).json(await Exam.create({ ...req.body, user: req.userId }));
}

export async function updateExam(req: Request, res: Response) {
  res.json(await Exam.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteExam(req: Request, res: Response) {
  await Exam.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}

export async function listTimetable(req: Request, res: Response) {
  res.json(await TimetableSlot.find(owner(req)).populate('subject', 'name code color').sort({ day: 1, startTime: 1 }));
}

export async function createTimetableSlot(req: Request, res: Response) {
  res.status(201).json(await TimetableSlot.create({ ...req.body, user: req.userId }));
}

export async function updateTimetableSlot(req: Request, res: Response) {
  res.json(await TimetableSlot.findOneAndUpdate({ _id: req.params.id, ...owner(req) }, req.body, { new: true }));
}

export async function deleteTimetableSlot(req: Request, res: Response) {
  await TimetableSlot.deleteOne({ _id: req.params.id, ...owner(req) });
  res.status(204).send();
}
