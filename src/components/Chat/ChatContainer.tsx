import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { Message } from '@/types';

interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (content: string) => Promise<void>;
  stopLoading?: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  error,
  onSendMessage,
  stopLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-lg w-full max-w-[95%] h-[90vh] sm:h-[80vh] md:h-[70vh] lg:h-[85vh] sm:w-[500px] md:w-[600px] flex flex-col relative border border-neutral-800">
        <ChatHeader onClose={onClose} />
        <ChatMessages 
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
        <ChatInput onSubmit={onSendMessage} isLoading={isLoading} stopLoading={stopLoading} />
      </div>
    </div>
  );
}; 