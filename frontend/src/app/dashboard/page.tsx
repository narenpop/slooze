'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/auth-context';

export default function DashboardPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [stats, setStats] = useState<Record<string, number | string> | null>(null);

  useEffect(() => {
    if (!session) {
      router.replace('/login');
      return;
    }

    if (session.role !== 'MANAGER') {
      router.replace('/products');
      return;
    }

    fetch('/dashboard', {
      headers: { 'x-user-role': session.role },
    })
      .then((response) => response.json())
      .then((payload) => setStats(payload));
  }, [router, session]);

  if (!session || session.role !== 'MANAGER') {
    return null;
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Manager Dashboard</h1>
      <pre className="rounded border p-4">{JSON.stringify(stats, null, 2)}</pre>
    </main>
  );
}
