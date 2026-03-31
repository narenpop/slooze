'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Session } from '../lib/types';

const SESSION_KEY = 'slooze.session';

type AuthContextValue = {
  session: Session | null;
  login: (session: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) {
      setSession(JSON.parse(raw));
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      login: (nextSession: Session) => {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
      },
      logout: () => {
        window.localStorage.removeItem(SESSION_KEY);
        setSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
