import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  colorMode: boolean;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  toggleColor: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('base-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'system';
  });

  const [colorMode, setColorMode] = useState(() => {
    const stored = localStorage.getItem('base-color');
    return stored === null ? true : stored === 'true';
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    if (effectiveTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [effectiveTheme]);

  // Apply color mode to DOM
  useEffect(() => {
    if (colorMode) {
      document.documentElement.setAttribute('data-color', 'true');
    } else {
      document.documentElement.removeAttribute('data-color');
    }
  }, [colorMode]);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('base-theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [effectiveTheme, setTheme]);

  const toggleColor = useCallback(() => {
    setColorMode(prev => {
      const next = !prev;
      localStorage.setItem('base-color', String(next));
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, colorMode, setTheme, toggleTheme, toggleColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
