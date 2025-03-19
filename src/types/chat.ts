export interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (content: string) => Promise<void>;
  stopLoading?: () => void;
}

export interface ChatHeaderProps {
  onClose: () => void;
}

export interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  stopLoading?: () => void;
}

export interface ChatManagerProps {
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

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  stopLoading: () => void;
}

/**
 * Parameters for the useChat hook
 * Currently empty, but defined for future extensibility
 */
export interface UseChatParams {
  /** Optional initial messages to pre-populate the chat */
  initialMessages?: Message[];
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
} 