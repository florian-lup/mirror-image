"use client";

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className={cn(
          "relative rounded-md border shadow-sm transition-all duration-150",
          isFocused
            ? "border-primary ring-1 ring-primary/30" 
            : "border-border hover:border-muted-foreground/50"
        )}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What do you want to know?"
            className="
              w-full px-4 py-3 rounded-md text-base
              bg-background text-foreground
              placeholder:text-muted-foreground
              focus:outline-none
              transition-colors duration-200
              pr-12
            "
            autoComplete="off"
          />
          <button
            type="submit"
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
              isActive
                ? 'text-primary-foreground bg-primary hover:bg-primary/90 cursor-pointer'
                : 'text-muted-foreground bg-muted cursor-not-allowed opacity-70'
            )}
            disabled={!isActive}
            aria-label="Submit question"
          >
            <FaArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
