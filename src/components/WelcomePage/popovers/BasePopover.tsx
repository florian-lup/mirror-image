"use client";

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PopoverProps } from '@/types';
import { usePopover } from '@/hooks';

export const BasePopover: React.FC<PopoverProps> = ({
  children,
  content,
  trigger,
  className = '',
  side = 'bottom',
  align = 'end',
  sideOffset = 8
}) => {
  const { isOpen, toggle } = usePopover();

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggle}>
      <PopoverPrimitive.Trigger asChild>
        {trigger || children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={`rounded-xl p-4 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50 ${className}`}
          sideOffset={sideOffset}
          align={align}
          side={side}
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-neutral-800/95" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}; 