import React from 'react';
import { X } from 'lucide-react';
import { ChatHeaderProps } from '@/types';
import Image from 'next/image';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-2 sm:p-4 border-b border-border">
      <Image src="/logo.svg" alt="Logo" width={24} height={24} />
      <button
        onClick={onClose}
        className="p-1 sm:p-1.5 hover:bg-secondary rounded-md transition-colors focus-ring"
        aria-label="Close chat"
      >
        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
      </button>
    </div>
  );
}; 