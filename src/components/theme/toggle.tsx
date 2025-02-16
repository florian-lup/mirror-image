'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-0.5 bg-gray-100/50 dark:bg-gray-800/50 p-0.5 rounded-full border border-gray-200 dark:border-gray-700/50">
      <button
        onClick={() => setTheme('light')}
        className={`p-1 rounded-full transition-colors ${
          theme === 'light'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
        aria-label="Light theme"
      >
        <FiSun className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1 rounded-full transition-colors ${
          theme === 'dark'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
        aria-label="Dark theme"
      >
        <FiMoon className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1 rounded-full transition-colors ${
          theme === 'system'
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
        aria-label="System theme"
      >
        <FiMonitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
} 