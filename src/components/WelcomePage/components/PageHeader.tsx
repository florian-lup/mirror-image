export const PageHeader = () => {
  return (
    <header className="h-20 sticky top-0 z-10 backdrop-blur-sm flex items-center">
      <nav className="flex justify-end items-center space-x-4 w-full px-8">
        <button 
          className="h-8 w-8 rounded-full bg-white/80 text-neutral-900 hover:bg-white/95 hover:shadow-md transition-all duration-200 ease-in-out flex items-center justify-center border border-white/20"
          aria-label="Help"
        >
          <span className="text-sm font-medium select-none">?</span>
        </button>
        <button 
          className="h-8 px-3.5 rounded-md bg-white/80 text-neutral-900 border border-white/20 hover:bg-white/95 hover:shadow-md transition-all duration-200 ease-in-out font-medium select-none flex items-center justify-center text-sm"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
