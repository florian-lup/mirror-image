"use client";

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { usePopover } from '@/hooks';
import { ComponentProps } from 'react';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<'button'>, 'className'>;

const BaseButton = ({ children, className = '', ...props }: BaseButtonProps) => (
  <button
    type="button"
    className={`bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50 flex items-center justify-center h-9 px-4 rounded-full ${className}`}
    {...props}
  >
    <span className="text-sm font-medium text-neutral-400 relative z-10">{children}</span>
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
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggle}>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="rounded-xl p-4 bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50 w-72"
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