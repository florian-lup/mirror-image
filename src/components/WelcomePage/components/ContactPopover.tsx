"use client";

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Copy, Check } from 'lucide-react';

export const ContactPopover = () => {
  const [copied, setCopied] = React.useState(false);
  const email = "contact@florianlup.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button 
          className="h-9 px-4 rounded-full bg-neutral-800/40 text-neutral-300 hover:bg-neutral-700/60 hover:text-neutral-100 hover:shadow-lg hover:shadow-neutral-900/40 transition-all duration-300 ease-out font-medium select-none flex items-center justify-center text-sm backdrop-blur-sm group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-400/10 to-transparent opacity-0 group-hover:opacity-100 
            transform translate-x-[-100%] animate-[sweep_2s_ease-in-out_infinite] pointer-events-none" />
          <span className="relative z-10">Contact</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl p-4 w-72 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50"
          sideOffset={8}
          align="end"
          side="bottom"
        >
          <div className="space-y-3 text-sm">
            <h3 className="font-medium text-neutral-100">Get in Touch</h3>
            <div className="flex items-center gap-x-3 text-neutral-300">
              <span className="flex-1">{email}</span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-700/80 transition-colors"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Popover.Arrow className="fill-neutral-800/95" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}; 