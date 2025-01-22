export const PageHeader = () => {
  return (
    <header className="h-20 sticky top-0 z-10 backdrop-blur-sm flex items-center">
      <nav className="flex justify-end items-center space-x-4 w-full px-8">
        <button 
          className="h-8 w-8 rounded-full bg-white/75 text-neutral-800 hover:bg-white/90 hover:shadow-sm transition-all duration-300 ease-out flex items-center justify-center border border-white/30"
          aria-label="Help"
        >
          <span className="text-sm font-medium select-none">?</span>
        </button>
        <button 
          className="h-8 px-3.5 rounded-md bg-white/75 text-neutral-800 border border-white/30 hover:bg-white/90 hover:shadow-sm transition-all duration-300 ease-out font-medium select-none flex items-center justify-center text-sm"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
