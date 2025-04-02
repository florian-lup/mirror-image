import { ChatMessagesProps } from '@/types';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
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
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 text-sm sm:text-base">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-4 mb-2 text-sm sm:text-base">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 text-sm sm:text-base">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-lg sm:text-xl font-semibold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base sm:text-lg font-semibold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold mb-2">{children}</h3>,
          a: ({ href, children }) => (
            <a 
              href={href}
              className="text-primary hover:text-primary/80 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

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
    <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-track scrollbar-thumb scroll-smooth">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`rounded-lg p-2 sm:p-3 ${
            message.type === 'user' 
              ? 'bg-secondary text-foreground' 
              : 'bg-card text-card-foreground'
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
        <div className="bg-card rounded-lg p-3 text-card-foreground flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
          <span className="ml-1 text-muted-foreground text-sm">thinking...</span>
        </div>
      )}

      {error && (
        <div className="bg-secondary rounded-lg p-3 text-card-foreground">
          {error}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}; 