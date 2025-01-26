"use client";

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { HelpCircle } from 'lucide-react';

export const HelpPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800/40 hover:bg-neutral-700/60 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/25 to-transparent opacity-0 group-hover:opacity-100 
            transform -translate-x-full animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
          <HelpCircle className="h-5 w-5 text-neutral-400 group-hover:text-neutral-300 relative z-10" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl p-4 w-80 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50"
          sideOffset={8}
          align="end"
          side="bottom"
        >
          <div className="space-y-2 text-sm">
            <h3 className="font-medium text-neutral-100">About this Website</h3>
            <p className="text-neutral-300 leading-relaxed">
              This is an AI-powered interface that allows you to ask questions and get instant, accurate answers about my background, projects, and expertise.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              Feel free to ask anything or use the suggested questions below to get started.
            </p>
          </div>
          <Popover.Arrow className="fill-neutral-800/95" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}; 