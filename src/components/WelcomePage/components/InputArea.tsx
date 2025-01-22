"use client";

import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

export const InputArea = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-x-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="min-w-0 flex-auto rounded-md bg-neutral-800 px-4 py-3 text-neutral-100 placeholder:text-neutral-400 shadow-sm border border-neutral-800 focus:border-neutral-600 focus:outline-none transition-colors sm:text-base"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-neutral-900 p-3 text-neutral-400 shadow-sm hover:bg-neutral-800 border border-neutral-700 focus:outline-none focus-visible:outline-none group transition-all"
            aria-label="Submit question"
          >
            <SparklesIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </form>
    </div>
  );
};
