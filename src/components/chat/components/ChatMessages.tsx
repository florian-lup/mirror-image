'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
      <div className="w-full h-full px-4 max-w-2xl mx-auto">
        <div className="flex flex-col h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 -mt-20">
              <Image 
                src="/mirror-image.svg" 
                alt="Mirror Image Logo" 
                width={192}
                height={192}
                className="opacity-20"
                priority
              />
              <p className="text-gray-400 mt-6 text-base font-semibold tracking-widest uppercase font-[var(--font-chakra-petch)] letter-spacing-[0.25em]">Mirror Image</p>
            </div>
          ) : (
            messages.map((message) => (
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
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
} 