export const PageHeader = () => {
  return (
    <header className="py-6">
      <nav className="flex justify-end space-x-3">
        <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors flex items-center justify-center text-lg font-medium">
          ?
        </button>
        <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors">
          Contact
        </button>
      </nav>
    </header>
  );
};
