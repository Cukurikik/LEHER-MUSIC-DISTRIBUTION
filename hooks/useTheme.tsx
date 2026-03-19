import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

export type Theme = 'quantum-pulse' | 'singularity-dark' | 'nova-prime';

export interface ThemeConfig {
    id: Theme;
    name: string;
    preview: {
        bg: string;
        text: string;
        primary: string;
        secondary: string;
    };
}

export const themes: ThemeConfig[] = [
    { id: 'quantum-pulse', name: 'Quantum Pulse', preview: { bg: '#0A0A1A', text: '#FFFFFF', primary: '#1331FF', secondary: '#FE2D8B' } },
    { id: 'singularity-dark', name: 'Singularity Dark', preview: { bg: '#020617', text: '#f8fafc', primary: '#9333ea', secondary: '#db2777' } },
    { id: 'nova-prime', name: 'Nova Prime', preview: { bg: '#111827', text: '#f9fafb', primary: '#f59e0b', secondary: '#14b8a6' } },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('quantum-pulse');

  useEffect(() => {
    const savedTheme = localStorage.getItem('leher_theme') as Theme;
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'quantum-pulse');
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem('leher_theme', newTheme);
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};