"use client";

import { cn } from '@/lib/utils';
import { FaBriefcase, FaCode, FaStar, FaCoffee } from 'react-icons/fa';

interface FaqListProps {
  onQuestionClick: (question: string) => void;
}

const faqQuestions = [
  { 
    text: "What's your background and experience?",
    icon: <FaBriefcase className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
  },
  { 
    text: "What kind of projects have you worked on?",
    icon: <FaStar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
  },
  { 
    text: "What technologies do you specialize in?",
    icon: <FaCode className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
  },
  { 
    text: "What are your interests outside of work?",
    icon: <FaCoffee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
  }
];

export const FaqList: React.FC<FaqListProps> = ({ onQuestionClick }) => {
  return (
    <div className="w-full">
      <h3 className="text-base font-medium text-foreground mb-3">Suggested questions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {faqQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question.text)}
            className={cn(
              "text-left p-3 rounded-md",
              "bg-card border border-border shadow-sm",
              "transition-all duration-200 hover:bg-secondary hover:border-border/80 focus-ring",
              "flex items-start gap-2.5"
            )}
          >
            {question.icon}
            <span className="text-sm text-card-foreground">
              {question.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};