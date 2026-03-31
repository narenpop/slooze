'use client';

import Link from 'next/link';
import { useAuth } from '../context/auth-context';

export function RoleMenu() {
  const { session } = useAuth();

  if (!session) {
    return null;
  }

  return (
    <nav className="flex gap-4 text-sm">
      {session.role === 'MANAGER' ? <Link href="/dashboard">Dashboard</Link> : null}
      <Link href="/products">Products</Link>
      <button disabled={session.role !== 'MANAGER'} className="opacity-80 disabled:cursor-not-allowed disabled:opacity-40">
        Admin Settings
      </button>
    </nav>
  );
}
