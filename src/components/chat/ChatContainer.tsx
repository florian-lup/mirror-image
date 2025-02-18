'use client';

import { useState, useRef } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Message } from '@/types/chat';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
        signal: abortControllerRef.current.signal
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Only add error message if it's not an abort error
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, I encountered an error while processing your request.',
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
        console.error('Chat error:', error);
      }
    } finally {
      if (abortControllerRef.current?.signal.aborted) {
        const abortMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Message generation stopped.',
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, abortMessage]);
      }
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1E1F1F] text-white">
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} onStop={handleStop} isLoading={isLoading} />
    </div>
  );
} 