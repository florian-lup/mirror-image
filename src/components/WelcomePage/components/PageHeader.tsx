import { HelpPopover } from './HelpPopover';
import { ContactPopover } from './ContactPopover';
import Image from 'next/image';

export const PageHeader = () => {
  return (
    <header className="h-20 sticky top-0 z-10 backdrop-blur-sm flex items-center bg-gradient-to-b from-neutral-900/80 to-neutral-900/0">
      <div className="flex justify-between items-center w-full px-8">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <nav className="flex items-center space-x-3">
          <ContactPopover />
          <HelpPopover />
        </nav>
      </div>
    </header>
  );
};
