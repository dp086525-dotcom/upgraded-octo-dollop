'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { authenticate } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await authenticate('signup', { name: String(form.get('name')), email: String(form.get('email')), password: String(form.get('password')) });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-glow">
        <h1 className="text-3xl font-bold">Create account</h1>
        <div className="mt-8 grid gap-4">
          <input name="name" placeholder="Full name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" minLength={6} required />
        </div>
        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
        <button className="mt-6 w-full rounded-2xl bg-accent px-5 py-3 font-semibold text-slate-950">Signup</button>
        <p className="mt-5 text-center text-sm text-slate-400"><Link href="/login">Already have an account?</Link></p>
      </form>
    </main>
  );
}
