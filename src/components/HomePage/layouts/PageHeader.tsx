import { lazy, Suspense } from 'react';

const HelpPopover = lazy(() => import('../popovers/HelpPopover').then(module => ({ 
  default: module.HelpPopover 
})));

const PopoverFallback = () => (
  <button className="text-muted-foreground">Loading...</button>
);

export const PageHeader = () => {
  return (
    <header className="w-full py-5">
      <div className="container mx-auto max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center w-full">
          <nav className="flex items-center">
            <Suspense fallback={<PopoverFallback />}>
              <HelpPopover />
            </Suspense>
          </nav>
        </div>
      </div>
    </header>
  );
};
