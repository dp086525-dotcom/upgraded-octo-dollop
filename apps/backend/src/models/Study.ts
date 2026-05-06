import { Schema, model, Types } from 'mongoose';

const attachmentSchema = new Schema(
  { title: String, url: String, kind: { type: String, enum: ['pdf', 'text', 'link', 'image'], default: 'text' } },
  { _id: false }
);

const moduleSchema = new Schema(
  { title: { type: String, required: true }, status: { type: String, enum: ['not-started', 'in-progress', 'done'], default: 'not-started' } },
  { _id: true }
);

export const Semester = model(
  'Semester',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      name: { type: String, required: true },
      startsOn: Date,
      endsOn: Date
    },
    { timestamps: true }
  )
);

export const Subject = model(
  'Subject',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      semester: { type: Types.ObjectId, ref: 'Semester', required: true, index: true },
      name: { type: String, required: true },
      code: String,
      color: { type: String, default: '#38bdf8' },
      syllabus: attachmentSchema,
      modules: [moduleSchema],
      notes: [attachmentSchema],
      importantQuestions: [String],
      assignments: [
        {
          title: String,
          dueDate: Date,
          status: { type: String, enum: ['pending', 'submitted', 'late'], default: 'pending' }
        }
      ]
    },
    { timestamps: true }
  )
);

export const Exam = model(
  'Exam',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      subject: { type: Types.ObjectId, ref: 'Subject', required: true },
      type: { type: String, enum: ['mid-sem', 'end-sem'], required: true },
      examDate: { type: Date, required: true },
      preparationStatus: { type: String, enum: ['not-started', 'revising', 'ready'], default: 'not-started' },
      marksScored: Number,
      maxMarks: Number
    },
    { timestamps: true }
  )
);

export const TimetableSlot = model(
  'TimetableSlot',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      subject: { type: Types.ObjectId, ref: 'Subject' },
      day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], required: true },
      title: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      room: String
    },
    { timestamps: true }
  )
);
