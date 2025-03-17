import { lazy, Suspense } from 'react';
import Image from 'next/image';

const HelpPopover = lazy(() => import('../popovers/HelpPopover').then(module => ({ 
  default: module.HelpPopover 
})));

const PopoverFallback = () => (
  <button className="text-muted-foreground">Loading...</button>
);

export const PageHeader = () => {
  return (
    <header className="py-5 flex items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="text-base font-medium text-foreground">Florian Lup</span>
        </div>
        <nav className="flex items-center">
          <Suspense fallback={<PopoverFallback />}>
            <HelpPopover />
          </Suspense>
        </nav>
      </div>
    </header>
  );
};
