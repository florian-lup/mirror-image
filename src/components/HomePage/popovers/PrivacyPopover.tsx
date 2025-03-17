"use client";

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { BaseButtonProps } from '@/types';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const BaseButton = ({ children, className = '', ...props }: BaseButtonProps) => (
  <button
    type="button"
    className={cn(
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md",
      "hover:bg-secondary text-muted-foreground hover:text-foreground",
      "transition-all duration-150 text-sm font-medium border border-transparent",
      className
    )}
    {...props}
  >
    <Shield className="h-3.5 w-3.5" />
    <span>{children}</span>
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
      <h3 className="font-medium text-card-foreground">Privacy Policy</h3>
      <div className="space-y-3 text-card-foreground/90 leading-relaxed">
        <p>
          Your privacy is important to me. This website operates with a strict no-tracking policy, ensuring your interactions remain private and secure.
        </p>
        <div className="space-y-2">
          <h4 className="text-card-foreground font-medium">Data Collection</h4>
          <p>
            I do not collect, store, or process your personal information. All queries are used temporarily for the sole purpose of generating an answer.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-card-foreground font-medium">Cookies & Storage</h4>
          <p>
            This website does not use cookies or local storage. Your session data is temporary and is cleared when you close your browser.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-card-foreground font-medium">Contact Information</h4>
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
          className="rounded-lg p-4 bg-card shadow-md border border-border z-50 w-[340px] max-w-[95vw]"
          sideOffset={8}
          align="center"
          side="top"
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