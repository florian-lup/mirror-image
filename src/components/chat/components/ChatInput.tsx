'use client';

import { useState } from 'react';
import { HiSpeakerWave } from "react-icons/hi2";
import { PiPaperPlaneFill } from "react-icons/pi";
import * as Tooltip from '@radix-ui/react-tooltip';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 py-4 bg-[#1E1F1F]">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 bg-[#343541] rounded-lg px-3 py-2">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root delayDuration={0}>
                <Tooltip.Trigger asChild>
                  <button type="button">
                    <HiSpeakerWave className="text-xl text-gray-400 cursor-pointer hover:text-gray-300" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm"
                    sideOffset={5}
                  >
                    Voice output coming soon
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message me..."
              className="flex-1 bg-transparent outline-none text-[15px] text-gray-200 placeholder-gray-400"
            />
            <PiPaperPlaneFill className="text-xl text-gray-400 cursor-pointer hover:text-gray-300" />
          </div>
        </form>
      </div>
    </div>
  );
} 