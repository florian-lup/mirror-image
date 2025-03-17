"use client";

import * as React from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { BaseButtonProps } from '@/types';
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
    <Mail className="h-3.5 w-3.5" />
    <span>{children}</span>
  </button>
);

export const ContactPopover: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const { isOpen, toggle } = usePopover();
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
    <BaseButton>
      Contact
    </BaseButton>
  );

  const content = (
    <div className="space-y-3 text-sm">
      <h3 className="font-medium text-card-foreground">Get in Touch</h3>
      <div className="flex items-center gap-x-3 text-card-foreground/90">
        <span className="flex-1">{email}</span>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md bg-secondary transition-colors duration-200 hover:bg-secondary/80"
          aria-label="Copy email address"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
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
          className="rounded-lg p-4 bg-card shadow-md border border-border z-50 w-72"
          sideOffset={8}
          align="end"
          side="bottom"
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-card" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}; 