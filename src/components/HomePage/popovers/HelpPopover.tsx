"use client";

import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { ComponentProps } from 'react';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<'button'>, 'className'>;

const IconButton = ({ children, className = '', ...props }: BaseButtonProps) => (
  <button
    type="button"
    className={`bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50 flex items-center justify-center w-10 h-10 rounded-full ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const HelpPopover: React.FC = () => {
  const { isOpen, toggle } = usePopover();

  const trigger = (
    <IconButton>
      <HelpCircle className="h-5 w-5 text-neutral-400 relative z-10" />
    </IconButton>
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
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggle}>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="rounded-xl p-4 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50 w-80"
          sideOffset={8}
          align="end"
          side="bottom"
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-neutral-800/95" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}; 