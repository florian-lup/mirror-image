'use client';

import { useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0 flex justify-center overflow-x-hidden custom-scrollbar">
      <div className="w-full px-4 max-w-2xl mx-auto">
        <div className="flex flex-col">
          {messages.map((message) => (
            <div
              key={message.id}
              className="w-full py-1.5"
            >
              <div
                className={`w-full bg-[#343541] px-3 py-2.5 rounded-lg`}
              >
                <p className="text-[15px] leading-relaxed text-gray-200 break-words whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
} 