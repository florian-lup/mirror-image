import { lazy, Suspense } from 'react';
import Link from 'next/link';

type BaseLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
};

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
    <footer className="py-4 sm:py-6 px-4 sm:px-0">
      <div className="flex flex-row justify-between items-center">
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

//add a copyright here

//add a privacy policy here

//add a terms of service here 