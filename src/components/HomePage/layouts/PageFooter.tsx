import { lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BaseLinkProps } from '@/types';
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { cn } from '@/lib/utils';

const BaseLink = ({ children, className = '', icon, ...props }: BaseLinkProps & { icon?: React.ReactNode }) => (
  <Link
    className={cn(
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150",
      "hover:bg-secondary text-muted-foreground hover:text-foreground",
      "text-sm font-medium border border-transparent",
      className
    )}
    {...props}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const PrivacyPopover = lazy(() => import('../popovers/PrivacyPopover').then(module => ({ 
  default: module.PrivacyPopover 
})));

const ContactPopover = lazy(() => import('../popovers/ContactPopover').then(module => ({ 
  default: module.ContactPopover 
})));

const PopoverFallback = () => (
  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-muted-foreground text-sm">
    <FaExternalLinkAlt className="h-3.5 w-3.5" />
    <span>Loading...</span>
  </button>
);

export const PageFooter = () => {
  return (
    <footer className="w-full py-4 border-t border-border mt-auto">
      <div className="container mx-auto max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
          <div className="text-sm text-muted-foreground order-2 sm:order-1 w-full sm:w-auto text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>© {new Date().getFullYear()} Florian Lup</span>
            </div>
          </div>
          <nav className="flex items-center gap-x-2 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
            <BaseLink 
              href="https://github.com/florian-lup"
              target="_blank"
              rel="noopener noreferrer"
              icon={<FaGithub className="h-3.5 w-3.5" />}
            >
              GitHub
            </BaseLink>
            <Suspense fallback={<PopoverFallback />}>
              <ContactPopover />
            </Suspense>
            <Suspense fallback={<PopoverFallback />}>
              <PrivacyPopover />
            </Suspense>
          </nav>
        </div>
      </div>
    </footer>
  );
};

//add a privacy policy here

//add a terms of service here 