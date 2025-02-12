'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-2 rounded-lg bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-foreground-light dark:text-foreground-dark transition-all duration-200"
          aria-label="Select theme"
        >
          {theme === 'dark' ? (
            <FiMoon className="w-5 h-5" />
          ) : theme === 'system' ? (
            <FiMonitor className="w-5 h-5" />
          ) : (
            <FiSun className="w-5 h-5" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[8rem] rounded-lg p-1 bg-background-light dark:bg-background-dark border border-gray-200/20 shadow-lg backdrop-blur-sm"
          align="end"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-default transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
              theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-foreground-light dark:text-foreground-dark'
            }`}
            onClick={() => setTheme('light')}
          >
            <FiSun className="w-4 h-4" />
            Light
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-default transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
              theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-foreground-light dark:text-foreground-dark'
            }`}
            onClick={() => setTheme('dark')}
          >
            <FiMoon className="w-4 h-4" />
            Dark
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-default transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
              theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-foreground-light dark:text-foreground-dark'
            }`}
            onClick={() => setTheme('system')}
          >
            <FiMonitor className="w-4 h-4" />
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
} 