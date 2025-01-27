"use client";

import * as React from 'react';
import { BasePopover } from './BasePopover';
import { NavButton } from '../components/NavButton';

export const PrivacyPopover: React.FC = () => {
  const trigger = (
    <NavButton>
      Privacy
    </NavButton>
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
    <BasePopover
      content={content}
      trigger={trigger}
      className="w-[340px]"
      side="top"
    />
  );
}; 