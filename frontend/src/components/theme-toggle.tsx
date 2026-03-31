'use client';

import { useEffect, useState } from 'react';

const THEME_KEY = 'slooze.theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    const initialTheme = storedTheme ?? 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <button onClick={toggleTheme} className="rounded border px-3 py-1 text-sm">
      Theme: {theme}
    </button>
  );
}
