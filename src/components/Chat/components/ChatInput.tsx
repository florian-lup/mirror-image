import { ArrowUp, Square } from 'lucide-react';
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
    <div className="p-2 sm:p-4 border-t border-border">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask follow-up questions..."
          className="w-full bg-background border border-border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 pr-10 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          autoComplete="off"
          inputMode="text"
          enterKeyHint="send"
        />
        <button
          type="submit"
          className={cn(
            'absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md transition-all duration-200',
            isLoading 
              ? 'bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer' 
              : isActive 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer' 
                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'
          )}
          disabled={!isActive && !isLoading}
          aria-label={isLoading ? "Stop loading" : "Send message"}
        >
          {isLoading ? (
            <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </button>
      </form>
    </div>
  );
}; 