'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { SectionHeader } from '@/components/SectionHeader';
import { api } from '@/lib/api';
import { nutritionTrend } from '@/lib/mockData';

type Overview = { todayLectures?: { title: string; startTime: string }[]; upcomingExams?: { type: string; examDate: string }[]; nutrition?: { protein: number; calories: number }; workout?: { name: string; exercises: { name: string }[] } };

export default function DashboardPage() {
  const [overview, setOverview] = useState<Overview>({});

  useEffect(() => {
    api<Overview>('/api/dashboard/overview').then(setOverview).catch(() => setOverview({}));
  }, []);

  return (
    <AppShell>
      <SectionHeader eyebrow="Command Center" title="Today’s plan" description="A quick view of study tasks, workout focus, macros, reminders, and progress trends." />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Lectures Today" value={String(overview.todayLectures?.length ?? 4)} helper="From weekly timetable" />
        <MetricCard title="Protein" value={`${overview.nutrition?.protein ?? 118}g`} helper="Daily intake goal" tone="green" />
        <MetricCard title="Calories" value={String(overview.nutrition?.calories ?? 2470)} helper="Logged today" tone="amber" />
        <MetricCard title="Next Workout" value={overview.workout?.name ?? 'Push Day'} helper="Chest + shoulders + triceps" tone="purple" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Nutrition history</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={nutritionTrend}>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16 }} />
                <Area type="monotone" dataKey="protein" stroke="#38bdf8" fill="#38bdf833" />
                <Area type="monotone" dataKey="calories" stroke="#34d399" fill="#34d39922" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Upcoming exams</h2>
          <div className="mt-5 space-y-3">
            {(overview.upcomingExams?.length ? overview.upcomingExams : [{ type: 'mid-sem', examDate: new Date().toISOString() }, { type: 'end-sem', examDate: new Date(Date.now() + 14 * 86400000).toISOString() }]).map((exam, index) => (
              <div key={index} className="rounded-2xl bg-white/5 p-4">
                <p className="font-medium capitalize">{exam.type.replace('-', ' ')}</p>
                <p className="text-sm text-slate-400">{new Date(exam.examDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
