"use client";

import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import { BasePopover } from './BasePopover';

export const HelpPopover: React.FC = () => {
  const trigger = (
    <button
      type="button"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40"
    >
      <HelpCircle className="h-5 w-5 text-neutral-400 relative z-10" />
    </button>
  );

  const content = (
    <div className="space-y-2 text-sm">
      <h3 className="font-medium text-neutral-100">About this Website</h3>
      <p className="text-neutral-300 leading-relaxed">
        This is an AI-powered personal website that uses Retrieval-Augmented Generation (RAG) to provide instant, accurate answers about my background, projects, and expertise.
      </p>
      <p className="text-neutral-300 leading-relaxed">
        Feel free to ask anything or use the suggested questions below to get started.
      </p>
    </div>
  );

  return (
    <BasePopover
      content={content}
      trigger={trigger}
      className="w-80"
    />
  );
}; 