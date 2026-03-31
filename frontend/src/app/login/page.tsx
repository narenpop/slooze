'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError('Unable to login with this account.');
      return;
    }

    const session = await response.json();
    login(session);

    router.push(session.role === 'MANAGER' ? '/dashboard' : '/products');
  };

  return (
    <main className="mx-auto mt-20 w-full max-w-md rounded border p-6 shadow">
      <h1 className="mb-5 text-2xl font-semibold">Commodities Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full rounded border p-2" name="email" type="email" placeholder="you@manager.slooze.com" />
        <input className="w-full rounded border p-2" name="password" type="password" placeholder="••••••••" />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button className="w-full rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Login</button>
      </form>
    </main>
  );
}
