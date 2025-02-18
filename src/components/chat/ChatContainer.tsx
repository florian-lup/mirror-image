'use client';

import { useState, useRef } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Message } from '@/types/chat';

type ModelProvider = 'openai' | 'gemini';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelProvider, setModelProvider] = useState<ModelProvider>('openai');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleModelChange = (provider: ModelProvider) => {
    setModelProvider(provider);
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
        body: JSON.stringify({ 
          message: content,
          modelProvider 
        }),
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
      <div className="flex justify-end p-2 space-x-2 bg-[#2D2E2E]">
        <button
          onClick={() => handleModelChange('openai')}
          className={`px-3 py-1 rounded ${
            modelProvider === 'openai' 
              ? 'bg-blue-600 text-white' 
              : 'bg-[#3D3E3E] text-gray-300'
          }`}
        >
          OpenAI
        </button>
        <button
          onClick={() => handleModelChange('gemini')}
          className={`px-3 py-1 rounded ${
            modelProvider === 'gemini' 
              ? 'bg-blue-600 text-white' 
              : 'bg-[#3D3E3E] text-gray-300'
          }`}
        >
          Gemini
        </button>
      </div>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} onStop={handleStop} isLoading={isLoading} />
    </div>
  );
} 