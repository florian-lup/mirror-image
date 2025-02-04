export interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

export interface ChatHeaderProps {
  onClose: () => void;
}

export interface ChatMessagesProps {
  initialQuestion?: string;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  stopLoading?: () => void;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
} 