"use client";

import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import { BasePopover } from './BasePopover';
import { NavButton } from '../components/NavButton';

export const HelpPopover: React.FC = () => {
  const trigger = (
    <NavButton isIconButton>
      <HelpCircle className="h-5 w-5 text-neutral-400 relative z-10" />
    </NavButton>
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