import { lazy, Suspense } from 'react';
import Image from 'next/image';

const ContactPopover = lazy(() => import('../popovers/ContactPopover').then(module => ({ 
  default: module.ContactPopover 
})));

const PopoverFallback = () => (
  <button className="text-neutral-500">Loading...</button>
);

export const PageHeader = () => {
  return (
    <header className="h-16 sm:h-20 flex items-center bg-gradient-to-b from-neutral-900/80 to-neutral-900/0">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            className="object-contain sm:w-[30px] sm:h-[30px]"
          />
        </div>
        <nav className="flex items-center">
          <Suspense fallback={<PopoverFallback />}>
            <ContactPopover />
          </Suspense>
        </nav>
      </div>
    </header>
  );
};
