"use client";

import { useState } from 'react';

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
            className="min-w-0 flex-auto rounded-md bg-primary-light/5 dark:bg-primary-dark/5 border border-accent-light dark:border-accent-dark px-4 py-3 text-content-light dark:text-content-dark placeholder:text-content-DEFAULT/60 dark:placeholder:text-content-DEFAULT/60 focus:border-primary-DEFAULT focus:ring-1 focus:ring-primary-DEFAULT dark:focus:border-primary-DEFAULT dark:focus:ring-primary-DEFAULT transition-colors sm:text-base"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-primary-light/10 dark:bg-primary-dark/10 border border-accent-light dark:border-accent-dark px-5 py-3 text-sm font-medium text-content-light dark:text-content-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 focus:outline-none focus:ring-1 focus:ring-primary-DEFAULT dark:focus:ring-primary-DEFAULT transition-colors"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
};
