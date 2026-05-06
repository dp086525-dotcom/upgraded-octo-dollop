'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/study', label: 'Study' },
  { href: '/gym', label: 'Gym' }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur lg:block">
      <Link href="/" className="text-xl font-bold tracking-tight">Student Life Tracker</Link>
      <p className="mt-2 text-sm text-slate-400">Study + Gym command center</p>
      <nav className="mt-10 space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={clsx('block rounded-2xl px-4 py-3 text-sm font-medium', pathname === item.href ? 'bg-accent text-slate-950' : 'text-slate-300 hover:bg-white/10')}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
