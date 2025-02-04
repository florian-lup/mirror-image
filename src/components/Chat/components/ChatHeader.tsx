import { X } from 'lucide-react';
import { ChatHeaderProps } from '@/types';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-neutral-800">
      <h2 className="text-base font-medium text-neutral-100">Chat</h2>
      <button
        onClick={onClose}
        className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors"
        aria-label="Close chat"
      >
        <X className="w-4 h-4 text-neutral-400" />
      </button>
    </div>
  );
}; 