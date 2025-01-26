"use client";

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';

export const PrivacyPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-all duration-300 hover:scale-105"
        >
          Privacy
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-xl p-4 w-[340px] bg-neutral-800/95 backdrop-blur-sm shadow-xl shadow-neutral-900/50 border border-neutral-700/50 z-50"
          sideOffset={8}
          align="end"
          side="top"
        >
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
          <Popover.Arrow className="fill-neutral-800/95" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}; 