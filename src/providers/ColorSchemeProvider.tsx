'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ColorScheme = 'light' | 'dark';

type ColorSchemeContextType = {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

const DEFAULT_COLOR_SCHEME: ColorScheme = 'dark';

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  useEffect(() => {
    // Check localStorage first
    const savedScheme = localStorage.getItem('colorScheme') as ColorScheme;
    if (savedScheme && (savedScheme === 'light' || savedScheme === 'dark')) {
      setColorScheme(savedScheme);
      document.documentElement.classList.toggle('dark', savedScheme === 'dark');
      return;
    }

    // If no saved scheme, use default dark scheme
    setColorScheme(DEFAULT_COLOR_SCHEME);
    document.documentElement.classList.add('dark');
  }, []);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    localStorage.setItem('colorScheme', newScheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
} 