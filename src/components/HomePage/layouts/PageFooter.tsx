import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { BaseLinkProps } from '@/types';

const BaseLink = ({ children, className = '', ...props }: BaseLinkProps) => (
  <Link
    className={`bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50 flex items-center justify-center h-9 px-4 rounded-full ${className}`}
    {...props}
  >
    <span className="text-sm font-medium text-neutral-400 relative z-10">{children}</span>
  </Link>
);

const PrivacyPopover = lazy(() => import('../popovers/PrivacyPopover').then(module => ({ 
  default: module.PrivacyPopover 
})));

const HelpPopover = lazy(() => import('../popovers/HelpPopover').then(module => ({ 
  default: module.HelpPopover 
})));

const PopoverFallback = () => (
  <button className="text-neutral-500">Loading...</button>
);

export const PageFooter = () => {
  return (
    <footer className="h-16 sm:h-20 flex items-center bg-gradient-to-b from-neutral-900/80 to-neutral-900/0">
      <div className="flex justify-between items-center w-full">
        <div className="text-xs sm:text-sm text-neutral-500">
          © {new Date().getFullYear()} Florian Lup
        </div>
        <nav className="flex items-center gap-x-2">
          <BaseLink 
            href="https://github.com/florian-lup"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </BaseLink>
          <Suspense fallback={<PopoverFallback />}>
            <HelpPopover />
          </Suspense>
          <Suspense fallback={<PopoverFallback />}>
            <PrivacyPopover />
          </Suspense>
        </nav>
      </div>
    </footer>
  );
};

//add a privacy policy here

//add a terms of service here 