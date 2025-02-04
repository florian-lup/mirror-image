import { Message } from '@/types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages,
  isLoading,
  error
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-emerald-800/60 hover:scrollbar-thumb-emerald-700/80">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-lg p-2.5 text-sm ${
            message.type === 'user' 
              ? 'bg-neutral-800/40 text-neutral-300' 
              : 'bg-emerald-950/40 text-emerald-300'
          }`}
        >
          {message.content}
        </div>
      ))}

      {isLoading && (
        <div className="bg-neutral-800/40 rounded-lg p-2.5 text-sm text-neutral-400">
          Thinking...
        </div>
      )}

      {error && (
        <div className="bg-red-950/40 rounded-lg p-2.5 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}; 