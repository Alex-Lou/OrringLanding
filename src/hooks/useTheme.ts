import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'orring-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch { return null; }
}

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * Resolves the theme by priority: user override (persisted) > system pref.
 * When the user never toggled, changes to the OS preference are picked up
 * live via matchMedia. A manual toggle freezes the site on that choice.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme() ?? systemTheme());
  const [hasOverride, setHasOverride] = useState<boolean>(() => readStoredTheme() !== null);

  // Apply the theme to <html> so the CSS variables swap everywhere.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }, [theme]);

  // Follow OS preference changes only while the user hasn't overridden.
  useEffect(() => {
    if (hasOverride) return;
    const mq = window.matchMedia(DARK_QUERY);
    const handler = (e: MediaQueryListEvent) => setThemeState(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [hasOverride]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setHasOverride(true);
    try { localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}
