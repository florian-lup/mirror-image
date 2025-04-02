"use client";

import * as React from 'react';
import { BsQuestionLg } from "react-icons/bs";
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { BaseButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const IconButton = ({ children, className = '', ...props }: BaseButtonProps) => (
  <button
    type="button"
    className={cn(
      "flex items-center justify-center p-2 rounded-md",
      "hover:bg-secondary text-muted-foreground hover:text-foreground",
      "transition-all duration-150 border border-transparent",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const HelpPopover: React.FC = () => {
  const { isOpen, toggle } = usePopover();

  const trigger = (
    <IconButton>
      <BsQuestionLg className="h-5 w-5" />
    </IconButton>
  );

  const content = (
    <div className="space-y-2 text-sm">
      <h3 className="font-medium text-card-foreground">About this Website</h3>
      <p className="text-card-foreground/90 leading-relaxed">
        This is an AI-powered personal website that uses Retrieval-Augmented Generation (RAG) to provide fast, accurate answers about my background, projects, and expertise.
      </p>
      <p className="text-card-foreground/90 leading-relaxed">
        Don&apos;t hesitate to ask anything or explore the suggested questions to get started.
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
          className="rounded-lg p-4 bg-card shadow-md border border-border z-50 w-80 max-w-[95vw]"
          sideOffset={8}
          align="center"
          side="bottom"
          avoidCollisions={true}
          collisionPadding={16}
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-card" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}; 