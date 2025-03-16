import { Message } from '@/types';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-semibold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
          code: ({ children }) => (
            <code className="bg-neutral-800 px-1 py-0.5 rounded text-sm">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="bg-neutral-800 p-2 rounded-lg mb-2 overflow-x-auto">{children}</pre>
          ),
          a: ({ href, children }) => (
            <a 
              href={href}
              className="text-emerald-400 hover:text-emerald-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

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

      {isLoading && (
        <div className="bg-emerald-950/40 rounded-lg p-2.5 text-sm text-emerald-300/80 flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>thinking...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-950/40 rounded-lg p-2.5 text-sm text-red-300">
          {error}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}; 