"use client";

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { BasePopover } from './BasePopover';

export const ContactPopover: React.FC = () => {
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

  const trigger = (
    <button
      type="button"
      className="h-9 px-4 rounded-full bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40"
    >
      <span className="text-sm font-medium text-neutral-400 relative z-10">Contact</span>
    </button>
  );

  const content = (
    <div className="space-y-3 text-sm">
      <h3 className="font-medium text-neutral-100">Get in Touch</h3>
      <div className="flex items-center gap-x-3 text-neutral-300">
        <span className="flex-1">{email}</span>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-neutral-800/60 transition-colors duration-200 hover:bg-neutral-700/60"
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
  );

  return (
    <BasePopover
      content={content}
      trigger={trigger}
      className="w-72"
    />
  );
}; 