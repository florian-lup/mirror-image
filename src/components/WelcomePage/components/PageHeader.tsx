'use client';

import { useColorScheme } from '@/providers/ColorSchemeProvider';

export const PageHeader = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <header className="py-6">
      <nav className="flex justify-end space-x-3">
        <button 
          onClick={toggleColorScheme}
          className="w-10 h-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-content-light dark:text-content-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors flex items-center justify-center text-base border border-accent-light dark:border-accent-dark"
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'light' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-content-light dark:text-content-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors flex items-center justify-center text-lg border border-accent-light dark:border-accent-dark"
        >
          ?
        </button>
        <button 
          className="px-4 py-2 rounded-md bg-primary-light/10 dark:bg-primary-dark/10 text-content-light dark:text-content-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors border border-accent-light dark:border-accent-dark"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
