# Student Life Tracker

A modern full-stack web application for B.Tech students to manage study planning, exams, timetable, gym workouts, nutrition, progress, supplements, streaks, reminders, and exports.

## Tech stack

- **Frontend:** Next.js App Router, React, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Auth:** JWT login/signup with protected dashboard APIs

## Folder structure

```txt
student-life-tracker/
├─ apps/
│  ├─ backend/
│  │  ├─ src/
│  │  │  ├─ config/          # env + database connection
│  │  │  ├─ controllers/     # route handlers
│  │  │  ├─ middleware/      # JWT auth, upload, errors
│  │  │  ├─ models/          # MongoDB schemas
│  │  │  ├─ routes/          # Express routers
│  │  │  ├─ services/        # dashboard/export helpers
│  │  │  ├─ app.ts           # Express app
│  │  │  └─ server.ts        # API bootstrap
│  │  └─ package.json
│  └─ frontend/
│     ├─ app/                # Next.js pages and layouts
│     ├─ components/         # reusable UI widgets
│     ├─ lib/                # API client and auth helpers
│     └─ package.json
├─ package.json              # monorepo scripts
└─ README.md
```

## Backend API overview

All non-auth routes require `Authorization: Bearer <token>`.

| Module | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me` |
| Dashboard | `GET /api/dashboard/overview` |
| Study | `GET/POST /api/study/semesters`, `PATCH/DELETE /api/study/semesters/:id`, `POST/PATCH/DELETE /api/study/subjects`, `POST /api/study/subjects/:id/syllabus`, `POST /api/study/subjects/:id/notes`, `POST/PATCH/DELETE /api/study/exams`, `GET/POST /api/study/timetable`, `PATCH/DELETE /api/study/timetable/:id` |
| Gym | `GET/POST /api/gym/nutrition`, `GET /api/gym/nutrition/history`, `GET/POST/PATCH/DELETE /api/gym/supplements`, `GET/POST/PATCH/DELETE /api/gym/workouts`, `GET/POST /api/gym/progress`, `POST /api/gym/progress/photos` |
| Bonus | `GET/POST/PATCH/DELETE /api/reminders`, `GET /api/streaks`, `GET /api/export/pdf` |

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure backend env:

   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```

   Update `MONGO_URI` if needed. For local MongoDB, use `mongodb://127.0.0.1:27017/student-life-tracker`.

3. Start both apps:

   ```bash
   npm run dev
   ```

4. Open:

   - Frontend: <http://localhost:3000>
   - Backend health: <http://localhost:5000/health>

## Demo account flow

Create a user from the signup page, then login. The frontend stores the JWT in `localStorage` and uses it for dashboard, study, and gym API calls.

## Future modules

The sidebar, API routes, service layer, and dashboard cards are intentionally modular so a Finance module can be added without changing existing Study/Gym code.
