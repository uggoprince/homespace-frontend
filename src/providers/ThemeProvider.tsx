'use client';

import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: () => void;
  setLight: () => void;
  clearPreference: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      // Check localStorage first (user preference)
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      // Fall back to system preference
      return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch (error) {
      // Handle Firefox private browsing or other localStorage errors
      return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }
  });

  const [userPreference, setUserPreference] = useState<string | null>(() => {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    // Ensure DOM is ready (especially important for Firefox)
    if (!globalThis.document?.documentElement) return;

    const root = globalThis.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Listen for system theme changes only if no user preference
  useEffect(() => {
    if (userPreference) return undefined;

    // Check if matchMedia is supported
    if (!globalThis.matchMedia) return undefined;

    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [userPreference]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      try {
        localStorage.setItem('theme', newValue ? 'dark' : 'light');
        setUserPreference(newValue ? 'dark' : 'light');
      } catch (error) {
        // Handle Firefox private browsing or quota exceeded
        setUserPreference(null);
      }
      return newValue;
    });
  };

  const setDark = () => {
    setIsDark(true);
    try {
      localStorage.setItem('theme', 'dark');
      setUserPreference('dark');
    } catch (error) {
      setUserPreference(null);
    }
  };

  const setLight = () => {
    setIsDark(false);
    try {
      localStorage.setItem('theme', 'light');
      setUserPreference('light');
    } catch (error) {
      setUserPreference(null);
    }
  };

  const clearPreference = () => {
    try {
      localStorage.removeItem('theme');
    } catch (error) {
      // Ignore errors when clearing
    }
    setUserPreference(null);
    // Revert to system preference
    const systemPrefersDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    setIsDark(systemPrefersDark);
  };

  const value = useMemo(() => ({
    isDark,
    toggleTheme,
    setDark,
    setLight,
    clearPreference,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
