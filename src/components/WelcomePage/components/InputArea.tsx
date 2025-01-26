"use client";

import { useState } from 'react';
import { Power } from 'lucide-react';

export const InputArea = () => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="mt-8">
        <div className={`flex items-center gap-x-1.5 p-1 rounded-full bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 ${isFocused ? 'shadow-lg shadow-neutral-900/50 ring-1 ring-neutral-700' : ''} transition-all duration-300`}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What do you want to know?"
            className="min-w-0 flex-auto rounded-l-full rounded-r-none bg-neutral-900 px-5 py-3 text-neutral-100 placeholder:text-neutral-400 focus:outline-none text-base"
          />
          <button
            type="submit"
            className={`flex items-center justify-center w-11 h-11 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 group transition-all duration-300 relative overflow-hidden
              ${question.trim() 
                ? 'bg-neutral-700/60 text-neutral-100 hover:bg-neutral-600/70 hover:scale-[1.02] hover:shadow-lg hover:shadow-neutral-900/40 before:absolute before:inset-[-2px] before:rounded-full before:bg-gradient-to-r before:from-neutral-700/0 before:via-neutral-400/40 before:to-neutral-700/0 before:animate-[spin_2s_linear_infinite] before:border-2 before:border-transparent' 
                : 'bg-neutral-800/20 text-neutral-400/50 hover:bg-neutral-700/40 hover:text-neutral-300 cursor-not-allowed opacity-50'
              }
              ${isFocused ? 'ring-1 ring-neutral-600 shadow-lg shadow-neutral-900/30' : ''}
              backdrop-blur-sm disabled:pointer-events-none
            `}
            disabled={!question.trim()}
            aria-label="Submit question"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-neutral-400/10 to-transparent opacity-0 group-hover:opacity-100 
              transform translate-x-[-100%] animate-[sweep_2s_ease-in-out_infinite] pointer-events-none
              ${question.trim() ? 'via-neutral-400/20' : ''}`}
            ></div>
            <Power className={`h-5 w-5 transition-all duration-300 relative z-10
              ${question.trim() ? 'text-neutral-100 scale-110' : 'text-neutral-400/50'}
              group-hover:scale-110 group-hover:text-neutral-300 group-hover:rotate-90 stroke-[1.5]
              motion-safe:transform motion-safe:transition-all motion-safe:duration-500`} 
            />
          </button>
        </div>
      </form>
    </div>
  );
};
