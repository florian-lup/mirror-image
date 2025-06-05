import { useState } from 'react';
import type { ChatMessage } from '@/types/chat';
import type { ChatApiResponse } from '@/types/chat';
import { useFetchJson } from '@/hooks/useFetchJson';

interface UseChatReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  send: (content: string) => Promise<void>;
  reset: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const { fetchJson } = useFetchJson<ChatApiResponse>();

  const callApi = async (history: ChatMessage[]): Promise<string> => {
    const data = await fetchJson('/api/chat', 'POST', { messages: history });
    return (
      data?.reply ??
      ("error" in (data ?? {}) ? (data as ChatApiResponse).error : undefined) ??
      'Sorry, something went wrong.'
    );
  };

  const send = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: content.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setIsTyping(true);

    const assistantReply = await callApi(history);
    setMessages((prev: ChatMessage[]) => [
      ...prev,
      { role: 'assistant', content: assistantReply },
    ]);
    setIsTyping(false);
  };

  const reset = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return { messages, isTyping, send, reset };
} 