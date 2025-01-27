import { lazy, Suspense } from 'react';
import { NavButton } from '../components/NavButton';

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
    <footer className="py-4 sm:py-6 px-4 sm:px-0">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xs sm:text-sm text-neutral-500">
          © {new Date().getFullYear()} Florian Lup
        </div>
        <nav className="flex items-center gap-x-2">
          <NavButton 
            href="https://github.com/florian-lup"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </NavButton>
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

//add a copyright here

//add a privacy policy here

//add a terms of service here 