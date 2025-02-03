"use client";

import { useState } from 'react';
import { CircleArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputAreaProps {
  onAskQuestion: (question: string) => void;
  onStartNewChat?: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onAskQuestion }) => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onAskQuestion(question);
    setQuestion('');
  };

  const isActive = question.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="mt-4 sm:mt-8">
        <div className={`
          flex items-center p-1
          bg-neutral-800/40 border border-neutral-700
          transition-all duration-200 rounded-full
          ${isFocused ? 'ring-1 ring-neutral-700 bg-neutral-800/60' : ''}
        `}>
          <div className="relative flex-1">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What do you want to know?"
              className="
                w-full px-4 py-2.5 rounded-full text-sm
                bg-neutral-900 text-neutral-100 pr-12
                placeholder:text-neutral-400 
                focus:outline-none
                transition-colors duration-200
                focus:bg-neutral-900
              "
            />
            <button
              type="submit"
              className={cn(
                'absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 group',
                isActive
                  ? 'text-emerald-400 hover:text-emerald-300 bg-neutral-800 hover:bg-emerald-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-emerald-400 before:border-r-emerald-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]'
                  : 'text-neutral-500 bg-neutral-800/20 border-neutral-800 cursor-not-allowed before:absolute before:inset-0 before:rounded-full before:border-2 before:border-neutral-800'
              )}
              disabled={!isActive}
              aria-label="Submit question"
            >
              <CircleArrowOutUpRight className={cn(
                "h-4 w-4 relative transition-transform duration-500 ease-in-out",
                isActive && "group-hover:rotate-[360deg]"
              )} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
