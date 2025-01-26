import { HelpPopover } from './HelpPopover';
import { ContactPopover } from './ContactPopover';

export const PageHeader = () => {
  return (
    <header className="h-20 sticky top-0 z-10 backdrop-blur-sm flex items-center bg-gradient-to-b from-neutral-900/80 to-neutral-900/0">
      <nav className="flex justify-end items-center space-x-3 w-full px-8">
        <HelpPopover />
        <ContactPopover />
      </nav>
    </header>
  );
};
