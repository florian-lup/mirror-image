"use client";

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { BaseButtonProps } from '@/types';

const BaseButton = ({ children, className = '', ...props }: BaseButtonProps) => (
  <button
    type="button"
    className={`bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50 flex items-center justify-center h-9 px-4 rounded-full ${className}`}
    {...props}
  >
    <span className="text-sm font-medium text-neutral-400 relative z-10">{children}</span>
  </button>
);

export const PrivacyPopover: React.FC = () => {
  const { isOpen, toggle } = usePopover();

  const trigger = (
    <BaseButton>
      Privacy
    </BaseButton>
  );

  const content = (
    <div className="space-y-3 text-sm">
      <h3 className="font-medium text-neutral-100">Privacy Policy</h3>
      <div className="space-y-3 text-neutral-300 leading-relaxed">
        <p>
          Your privacy is important to me. This website operates with a strict no-tracking policy, ensuring your interactions remain private and secure.
        </p>
        <div className="space-y-2">
          <h4 className="text-neutral-100 font-medium">Data Collection</h4>
          <p>
            I do not collect, store, or process your personal information. All queries are used temporarily for the sole purpose of generating an answer.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-neutral-100 font-medium">Cookies & Storage</h4>
          <p>
            This website does not use cookies or local storage. Your session data is temporary and is cleared when you close your browser.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-neutral-100 font-medium">Contact Information</h4>
          <p>
            If you reach out via email, I&apos;ll only use it to respond to your message and will not be shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggle}>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="rounded-xl p-4 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50 w-[340px]"
          sideOffset={8}
          align="end"
          side="top"
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-neutral-800/95" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}; 