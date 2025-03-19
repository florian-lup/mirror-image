/**
 * ChatManager is a higher-order component that manages all chat-related state and functionality.
 * 
 * Features:
 * - Centralizes chat state management
 * - Prevents duplicate messages
 * - Handles chat opening/closing
 * - Manages message sending and clearing
 */

"use client";

import React, { useState } from 'react';
import { useChat } from '@/hooks';
import { ChatContainer } from './ChatContainer';
import { ChatManagerProps } from '@/types';

export const ChatManager: React.FC<ChatManagerProps> = ({ children, onClose }) => {
  // Track if chat UI is visible
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Get chat operations from hook
  const { messages, isLoading, error, sendMessage, clearMessages, stopLoading } = useChat();

  /**
   * Opens the chat and sends the initial message.
   * Prevents duplicate messages by checking if chat is already open.
   */
  const handleOpenChat = (question: string) => {
    if (!isChatOpen) {
      setIsChatOpen(true);
      sendMessage(question);
    }
  };

  /**
   * Closes the chat, clears messages, and calls optional onClose callback.
   * This ensures chat state is reset between sessions.
   */
  const handleCloseChat = () => {
    setIsChatOpen(false);
    clearMessages();
    stopLoading();
    onClose?.();
  };

  return (
    <>
      {/* Render children with chat operations */}
      {children({ handleOpenChat })}

      {/* Render chat UI */}
      <ChatContainer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
        stopLoading={stopLoading}
      />
    </>
  );
}; 