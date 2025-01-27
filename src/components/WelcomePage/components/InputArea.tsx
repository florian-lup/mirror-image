"use client";

import { useState } from 'react';
import { CircleArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const InputArea: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    console.log('Question submitted:', question);
  };

  const isActive = question.trim().length > 0;

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="mt-4 sm:mt-8">
        <div className={`
          flex items-center gap-x-2 p-1 rounded-full 
          bg-neutral-800/40 border border-neutral-700
          transition-all duration-200
          ${isFocused ? 'ring-1 ring-neutral-700 bg-neutral-800/60' : ''}
        `}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What do you want to know?"
            className="
              min-w-0 flex-auto px-4 py-2.5 rounded-full text-sm
              bg-neutral-900 text-neutral-100
              placeholder:text-neutral-400 
              focus:outline-none
              transition-colors duration-200
              focus:bg-neutral-900
            "
          />
          <button
            type="submit"
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full relative transition-all duration-200 group',
              isActive
                ? 'text-emerald-400 hover:text-emerald-300 bg-neutral-800 hover:bg-emerald-950 cursor-pointer before:absolute before:inset-0 before:rounded-full before:border-2 before:border-t-emerald-400 before:border-r-emerald-400 before:border-b-transparent before:border-l-transparent before:animate-[spin_1s_linear_infinite]'
                : 'text-neutral-500 bg-neutral-800/20 border-neutral-800 cursor-not-allowed before:absolute before:inset-0 before:rounded-full before:border-2 before:border-neutral-800'
            )}
            disabled={!isActive}
            aria-label="Submit question"
          >
            <CircleArrowOutUpRight className={cn(
              "h-5 w-5 relative transition-transform duration-500 ease-in-out",
              isActive && "group-hover:rotate-[360deg]"
            )} />
          </button>
        </div>
      </form>
    </div>
  );
};
