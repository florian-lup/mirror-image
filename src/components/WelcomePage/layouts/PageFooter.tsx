import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { styles } from '@/styles/shared';

const PrivacyPopover = lazy(() => import('../popovers/PrivacyPopover').then(module => ({ 
  default: module.PrivacyPopover 
})));

const PopoverFallback = () => (
  <button className={styles.popover.trigger}>Loading...</button>
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
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <div className={styles.divider} />
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