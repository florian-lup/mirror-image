import { X, CircleArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  initialQuestion,
}) => {
  const [message, setMessage] = useState('');
  const isActive = message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Handle message submission
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl w-full max-w-3xl h-[600px] flex flex-col relative border border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <h2 className="text-lg font-medium text-neutral-100">Chat</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {initialQuestion && (
            <div className="bg-neutral-800/40 rounded-lg p-3 text-sm text-neutral-300">
              {initialQuestion}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800">
          <form className="relative" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask follow-up questions..."
              className="w-full bg-neutral-800/40 border border-neutral-700 rounded-full px-4 py-2.5 pr-12 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-700"
            />
            <button
              type="submit"
              className={cn(
                'absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 group',
                isActive
                  ? 'text-emerald-400 hover:text-emerald-300 bg-neutral-800 hover:bg-emerald-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-emerald-400 before:border-r-emerald-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]'
                  : 'text-neutral-500 bg-neutral-800/20 border-neutral-800 cursor-not-allowed before:absolute before:inset-0 before:rounded-full before:border-2 before:border-neutral-800'
              )}
              disabled={!isActive}
              aria-label="Send message"
            >
              <CircleArrowOutUpRight className={cn(
                "h-4 w-4 relative transition-transform duration-500 ease-in-out",
                isActive && "group-hover:rotate-[360deg]"
              )} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; 