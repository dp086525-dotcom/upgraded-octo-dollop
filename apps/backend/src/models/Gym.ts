import { Schema, model, Types } from 'mongoose';

export const NutritionLog = model(
  'NutritionLog',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      date: { type: Date, required: true, index: true },
      protein: { type: Number, default: 0 },
      calories: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
      vitamins: { zinc: Number, iron: Number, vitaminC: Number, vitaminD: Number, magnesium: Number },
      notes: String
    },
    { timestamps: true }
  )
);

export const Supplement = model(
  'Supplement',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      category: { type: String, enum: ['protein', 'creatine', 'multivitamin', 'collagen', 'other'], required: true },
      brandName: { type: String, required: true },
      price: Number,
      dosage: String,
      notes: String
    },
    { timestamps: true }
  )
);

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: Number,
    reps: String,
    instructions: String,
    videoLink: String,
    muscleGroup: String
  },
  { _id: true }
);

export const WorkoutPlan = model(
  'WorkoutPlan',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', index: true },
      name: { type: String, required: true },
      type: { type: String, enum: ['push-pull-legs', 'bro-split', 'full-body', 'custom'], default: 'custom' },
      day: String,
      exercises: [exerciseSchema],
      isTemplate: { type: Boolean, default: false }
    },
    { timestamps: true }
  )
);

export const ProgressEntry = model(
  'ProgressEntry',
  new Schema(
    {
      user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
      date: { type: Date, required: true, index: true },
      weightKg: Number,
      measurements: { chest: Number, waist: Number, arms: Number, thighs: Number },
      photos: [{ title: String, url: String }],
      notes: String
    },
    { timestamps: true }
  )
);
