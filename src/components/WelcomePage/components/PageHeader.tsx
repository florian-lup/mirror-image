export const PageHeader = () => {
  return (
    <header className="py-6">
      <nav className="flex justify-end space-x-4">
        <button 
          className="w-10 h-10 rounded-full bg-neutral-900 text-neutral-300 hover:bg-neutral-800 transition-all flex items-center justify-center border-2 border-neutral-700"
          aria-label="Help"
        >
          <span className="text-lg font-medium">?</span>
        </button>
        <button 
          className="px-4 py-2 rounded-md bg-neutral-900 text-neutral-300 border-2 border-neutral-700 hover:bg-neutral-800 transition-all font-medium"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
