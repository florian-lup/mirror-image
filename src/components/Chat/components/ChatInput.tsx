import { CircleArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChatInputProps } from '@/types';

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const isActive = message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="p-2.5 sm:p-3 md:p-4 border-t border-neutral-800">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask follow-up questions..."
          className="w-full bg-neutral-800/40 border border-neutral-700 rounded-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pr-9 sm:pr-10 md:pr-12 text-xs sm:text-sm md:text-base text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-700"
        />
        <button
          type="submit"
          className={cn(
            'absolute right-1 sm:right-1.5 md:right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full transition-all duration-200 group',
            isActive
              ? 'text-emerald-400 hover:text-emerald-300 bg-neutral-800 hover:bg-emerald-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-emerald-400 before:border-r-emerald-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]'
              : 'text-neutral-500 bg-neutral-800/20 border-neutral-800 cursor-not-allowed before:absolute before:inset-0 before:rounded-full before:border-2 before:border-neutral-800'
          )}
          disabled={!isActive}
          aria-label="Send message"
        >
          <CircleArrowOutUpRight className={cn(
            "h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 relative transition-transform duration-500 ease-in-out",
            isActive && "group-hover:rotate-[360deg]"
          )} />
        </button>
      </form>
    </div>
  );
}; 