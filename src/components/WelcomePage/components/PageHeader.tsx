'use client';

import { useColorScheme } from '@/providers/ColorSchemeProvider';

export const PageHeader = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <header className="py-6">
      <nav className="flex justify-end space-x-3">
        <button 
          onClick={toggleColorScheme}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-lg"
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-lg font-medium">
          ?
        </button>
        <button className="px-4 py-2 rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          Contact
        </button>
      </nav>
    </header>
  );
};
