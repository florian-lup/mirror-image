"use client";

import { useState } from 'react';
import { Power } from 'lucide-react';

export const InputArea: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="mt-4 sm:mt-8">
        <div className={`flex items-center gap-x-1 sm:gap-x-1.5 p-0.5 sm:p-1 rounded-full bg-neutral-800/50 ${isFocused ? 'shadow-lg shadow-neutral-900/50 ring-1 ring-neutral-700' : ''}`}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What do you want to know?"
            className="min-w-0 flex-auto rounded-l-full rounded-r-none bg-neutral-900 px-4 sm:px-5 py-2.5 sm:py-3 text-neutral-100 placeholder:text-neutral-400 focus:outline-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 relative overflow-hidden backdrop-blur-sm disabled:pointer-events-none
              ${question.trim() 
                ? 'bg-neutral-700/60 text-neutral-100' 
                : 'bg-neutral-800/20 text-neutral-400/50 cursor-not-allowed opacity-50'
              }
              ${isFocused ? 'ring-1 ring-neutral-600 shadow-lg shadow-neutral-900/30' : ''}`}
            disabled={!question.trim()}
            aria-label="Submit question"
          >
            <Power className="h-5 w-5 relative z-10 stroke-[1.5]" />
          </button>
        </div>
      </form>
    </div>
  );
};
