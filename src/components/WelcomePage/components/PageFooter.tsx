import Link from 'next/link';
import { PrivacyPopover } from './PrivacyPopover';

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
            className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-300 transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <div className="h-3 sm:h-4 w-px bg-neutral-800" />
          <PrivacyPopover />
        </div>
      </div>
    </footer>
  );
};

//add a copyright here

//add a privacy policy here

//add a terms of service here 