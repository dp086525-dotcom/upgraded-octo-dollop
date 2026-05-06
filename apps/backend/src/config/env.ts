import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().default('mongodb://127.0.0.1:27017/student-life-tracker'),
  JWT_SECRET: z.string().min(12).default('dev-secret-change-me'),
  CLIENT_ORIGIN: z.string().default('http://localhost:3000')
});

export const env = envSchema.parse(process.env);
