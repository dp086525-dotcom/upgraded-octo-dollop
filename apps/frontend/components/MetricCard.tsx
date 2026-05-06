import clsx from 'clsx';

type Props = { title: string; value: string; helper: string; tone?: 'blue' | 'green' | 'purple' | 'amber' };

const tones = { blue: 'from-sky-500/20', green: 'from-emerald-500/20', purple: 'from-violet-500/20', amber: 'from-amber-500/20' };

export function MetricCard({ title, value, helper, tone = 'blue' }: Props) {
  return (
    <div className={clsx('rounded-3xl border border-white/10 bg-gradient-to-br to-white/[0.03] p-5 shadow-glow', tones[tone])}>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-3 text-3xl font-semibold">{value}</h3>
      <p className="mt-2 text-sm text-slate-400">{helper}</p>
    </div>
  );
}
