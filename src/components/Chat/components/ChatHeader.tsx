import { X } from 'lucide-react';
import { ChatHeaderProps } from '@/types';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 border-b border-neutral-800">
      <h2 className="text-sm sm:text-base md:text-lg font-medium text-neutral-100">Chat</h2>
      <button
        onClick={onClose}
        className="p-1 sm:p-1.5 md:p-2 hover:bg-neutral-800 rounded-lg transition-colors"
        aria-label="Close chat"
      >
        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-400" />
      </button>
    </div>
  );
}; 