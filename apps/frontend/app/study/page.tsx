import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';

const subjects = [
  { name: 'Data Structures', code: 'CS201', status: 'Module 3 revising', assignments: 2 },
  { name: 'Operating Systems', code: 'CS205', status: 'Module 2 pending', assignments: 1 },
  { name: 'Digital Electronics', code: 'EC203', status: 'Ready for mid sem', assignments: 0 }
];

const timetable = ['Mon 09:00 DSA', 'Tue 11:00 OS Lab', 'Thu 14:00 Electronics', 'Sat 10:00 Revision'];

export default function StudyPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Study Module" title="Semester workspace" description="Create semesters, organize subjects, upload syllabus/notes, track important questions, assignments, exams, and weekly lectures." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Sem 4 subjects</h2>
            <button className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950">Add subject</button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {subjects.map((subject) => (
              <article key={subject.code} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm text-accent">{subject.code}</p>
                <h3 className="mt-2 text-2xl font-semibold">{subject.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{subject.status}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <span className="rounded-2xl bg-white/5 p-3">Syllabus PDF</span>
                  <span className="rounded-2xl bg-white/5 p-3">Notes upload</span>
                  <span className="rounded-2xl bg-white/5 p-3">Questions</span>
                  <span className="rounded-2xl bg-white/5 p-3">Assignments: {subject.assignments}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Exam tracking</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p className="rounded-2xl bg-white/5 p-4">Mid Sem: May 18 · 70% prepared · marks pending</p>
              <p className="rounded-2xl bg-white/5 p-4">End Sem: Jun 25 · revision scheduled</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Weekly timetable</h2>
            <div className="mt-4 space-y-3">
              {timetable.map((slot) => <p key={slot} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">{slot}</p>)}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
