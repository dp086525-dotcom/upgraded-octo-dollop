import Link from 'next/link';
import { MetricCard } from '@/components/MetricCard';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),#020617] px-6 py-10">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 py-20 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">B.Tech Study + Gym OS</span>
        <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Balance semesters, exams, workouts, and macros in one dark dashboard.</h1>
        <p className="max-w-2xl text-lg text-slate-400">Student Life Tracker combines JWT-secured productivity tools with nutrition, workout, progress, reminders, streaks, and export-ready architecture.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/signup" className="rounded-2xl bg-accent px-6 py-3 font-semibold text-slate-950">Start tracking</Link>
          <Link href="/login" className="rounded-2xl border border-white/10 px-6 py-3 font-semibold text-slate-200">Login</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <MetricCard title="Study Modules" value="8" helper="Subjects, syllabus, notes, exams" />
        <MetricCard title="Fitness Tools" value="6" helper="Nutrition, supplements, workouts" tone="green" />
        <MetricCard title="Bonus Ready" value="3" helper="Reminders, streaks, PDF export" tone="purple" />
      </section>
    </main>
  );
}
