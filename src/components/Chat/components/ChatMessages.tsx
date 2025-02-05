import { Message } from '@/types';
import { useEffect, useRef } from 'react';
import { MarkdownMessage } from './MarkdownMessage';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when messages change or loading state changes

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-emerald-800/60 hover:scrollbar-thumb-emerald-700/80 scroll-smooth">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-lg p-2.5 text-sm ${
            message.type === 'user' 
              ? 'bg-neutral-800/40 text-neutral-300' 
              : 'bg-emerald-950/40 text-emerald-300'
          }`}
        >
          {message.type === 'assistant' ? (
            <MarkdownMessage content={message.content} />
          ) : (
            message.content
          )}
        </div>
      ))}

      {error && (
        <div className="bg-red-950/40 rounded-lg p-2.5 text-sm text-red-300">
          {error}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}; 