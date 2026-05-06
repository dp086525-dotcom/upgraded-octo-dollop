import { Schema, model, Types } from 'mongoose';

export const Reminder = model(
  'Reminder',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      title: { type: String, required: true },
      module: { type: String, enum: ['study', 'gym', 'general'], default: 'general' },
      remindAt: { type: Date, required: true },
      done: { type: Boolean, default: false }
    },
    { timestamps: true }
  )
);
