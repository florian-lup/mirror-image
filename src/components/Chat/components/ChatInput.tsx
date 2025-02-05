import { CircleGauge, CirclePause } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChatInputProps } from '@/types';

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading = false, stopLoading }) => {
  const [message, setMessage] = useState('');
  const isActive = message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) {
      stopLoading?.();
      return;
    }
    if (!message.trim()) return;
    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="p-3 border-t border-neutral-800">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask follow-up questions..."
          className="w-full bg-neutral-800/40 border border-neutral-700 rounded-full px-3 py-2 pr-10 text-[16px] leading-normal md:text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          autoComplete="off"
        />
        <button
          type="submit"
          className={cn(
            'absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 group',
            isLoading ? 'hover:bg-red-950 text-red-400 bg-neutral-800 hover:bg-red-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-red-400 before:border-r-red-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]' : 'hover:bg-neutral-700',
            !isLoading && !isActive && 'bg-neutral-800/20 cursor-not-allowed',
            !isLoading && isActive && 'text-emerald-400 hover:text-emerald-300 bg-neutral-800 hover:bg-emerald-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-emerald-400 before:border-r-emerald-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]'
          )}
          disabled={!isActive && !isLoading}
          aria-label={isLoading ? "Stop loading" : "Send message"}
        >
          {isLoading ? (
            <CirclePause className="h-4 w-4 text-red-400" />
          ) : (
            <CircleGauge className={cn(
              "h-4 w-4 relative",
              isActive ? "text-emerald-400 animate-[spin_1s_linear_infinite]" : "text-neutral-500"
            )} />
          )}
        </button>
      </form>
    </div>
  );
}; 