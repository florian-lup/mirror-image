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

import { useState } from 'react';
import { useChat } from '@/hooks';
import { ChatContainer } from './ChatContainer';

interface ChatManagerProps {
  /** 
   * Render prop that receives chat operations and returns React nodes.
   * @param handleOpenChat Function to open chat and send initial message
   */
  children: (props: {
    handleOpenChat: (question: string) => void;
  }) => React.ReactNode;
  /** Optional callback when chat is closed */
  onClose?: () => void;
}

export const ChatManager: React.FC<ChatManagerProps> = ({ children, onClose }) => {
  // Track if chat UI is visible
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Get chat operations from hook
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

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
      />
    </>
  );
}; 