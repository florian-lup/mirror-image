import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { ChatContainerProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-card rounded-lg w-full max-w-[98%] h-[95vh] sm:h-[90vh] md:h-[85vh] lg:h-[80vh] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] flex flex-col relative border border-border"
          >
            <ChatHeader onClose={onClose} />
            <ChatMessages 
              messages={messages}
              isLoading={isLoading}
              error={error}
            />
            <ChatInput onSubmit={onSendMessage} isLoading={isLoading} stopLoading={stopLoading} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 