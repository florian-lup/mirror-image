import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { BaseLinkProps } from '@/types';
import { Github, ExternalLink } from 'lucide-react';
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
    <ExternalLink className="h-3.5 w-3.5" />
    <span>Loading...</span>
  </button>
);

export const PageFooter = () => {
  return (
    <footer className="py-4 border-t border-border mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          © {new Date().getFullYear()} Florian Lup
        </div>
        <nav className="flex items-center gap-x-2 order-1 sm:order-2">
          <BaseLink 
            href="https://github.com/florian-lup"
            target="_blank"
            rel="noopener noreferrer"
            icon={<Github className="h-3.5 w-3.5" />}
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
    </footer>
  );
};

//add a privacy policy here

//add a terms of service here 