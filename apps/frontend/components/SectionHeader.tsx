export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
    </div>
  );
}
