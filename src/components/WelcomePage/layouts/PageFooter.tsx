import { lazy, Suspense } from 'react';
import Link from 'next/link';

const PrivacyPopover = lazy(() => import('../popovers/PrivacyPopover').then(module => ({ 
  default: module.PrivacyPopover 
})));

const PopoverFallback = () => (
  <button className="text-xs sm:text-sm text-neutral-500">Loading...</button>
);

export const PageFooter = () => {
  return (
    <footer className="py-4 sm:py-6 px-4 sm:px-0">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xs sm:text-sm text-neutral-500">
          © {new Date().getFullYear()} Florian Lup
        </div>
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <Link 
            href="https://github.com/florian-lup" 
            className="text-xs sm:text-sm text-neutral-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <div className="h-3 sm:h-4 w-px bg-neutral-800" />
          <Suspense fallback={<PopoverFallback />}>
            <PrivacyPopover />
          </Suspense>
        </div>
      </div>
    </footer>
  );
};

//add a copyright here

//add a privacy policy here

//add a terms of service here 