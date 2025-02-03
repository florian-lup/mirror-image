import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { ChatContainerProps } from '@/types';
import { useChat } from '@/hooks';

export const ChatContainer: React.FC<ChatContainerProps> = ({
  isOpen,
  onClose,
  initialQuestion,
}) => {
  const { messages, isLoading, error, sendMessage } = useChat();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-neutral-900 rounded-lg sm:rounded-xl md:rounded-2xl w-full max-w-[calc(100vw-1rem)] sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[95vh] sm:h-[90vh] md:h-[80vh] lg:h-[600px] flex flex-col relative border border-neutral-800">
        <ChatHeader onClose={onClose} />
        <ChatMessages 
          initialQuestion={initialQuestion}
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
        <ChatInput onSubmit={sendMessage} />
      </div>
    </div>
  );
}; 