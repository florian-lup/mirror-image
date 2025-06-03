import { useState } from 'react';
import type { ChatMessage } from '@/types/chat';

interface UseChatReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  send: (content: string) => Promise<void>;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const callApi = async (history: ChatMessage[]): Promise<string> => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply?: string; error?: string };
      return data.reply ?? data.error ?? 'Sorry, something went wrong.';
    } catch (err) {
      console.error(err);
      return 'Failed to fetch response.';
    }
  };

  const send = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: content.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setIsTyping(true);

    const assistantReply = await callApi(history);
    setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    setIsTyping(false);
  };

  return { messages, isTyping, send };
} 