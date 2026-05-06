import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { SectionHeader } from '@/components/SectionHeader';
import { workoutTemplates } from '@/lib/mockData';

const supplements = ['Optimum Whey · ₹3299 · 1 scoop/day', 'Creatine Monohydrate · ₹899 · 5g/day', 'Multivitamin · ₹599 · after breakfast'];
const vitamins = ['Zinc 12mg', 'Iron 8mg', 'Vitamin C 80mg', 'Vitamin D 1000IU'];

export default function GymPage() {
  return (
    <AppShell>
      <SectionHeader eyebrow="Gym Module" title="Fitness workspace" description="Log nutrition, supplements, workouts, weight, body measurements, progress photos, and consistency streaks." />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="Protein" value="118g" helper="Target 130g" tone="green" />
        <MetricCard title="Calories" value="2470" helper="Lean bulk day" tone="amber" />
        <MetricCard title="Weight" value="72.4kg" helper="+0.3kg this week" />
        <MetricCard title="Gym streak" value="5 days" helper="Push/Pull/Legs active" tone="purple" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Workout plans</h2>
            <button className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950">Custom plan</button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workoutTemplates.map((plan) => (
              <article key={plan.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm text-accent">{plan.type}</p>
                <h3 className="mt-2 text-xl font-semibold">{plan.name}</h3>
                <p className="mt-3 text-sm text-slate-400">{plan.exercises}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Supplements</h2>
          <div className="mt-5 space-y-3">
            {supplements.map((item) => <p key={item} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">{item}</p>)}
          </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Vitamins</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {vitamins.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-300">{item}</span>)}
          </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 xl:col-span-2">
          <h2 className="text-xl font-semibold">Progress tracker</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {['Weight log', 'Body measurements', 'Progress photos'].map((item) => <div key={item} className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">{item}</div>)}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
