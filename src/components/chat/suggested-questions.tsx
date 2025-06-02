import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const suggestedQuestions = [
  {
    question: "What's your background and experience?",
    category: "Experience"
  },
  {
    question: "What kind of projects have you worked on?",
    category: "Projects"
  },
  {
    question: "What technologies do you specialize in?",
    category: "Skills"
  },
  {
    question: "What are your interests outside of work?",
    category: "Hobbies"
  }
];

interface SuggestedQuestionsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedQuestionsComponent = ({ onPromptClick }: SuggestedQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {suggestedQuestions.map((item, index) => (
        <Card
          key={index}
          className="p-4 cursor-pointer hover:bg-accent/50 transition-colors border-border/50 bg-card/50 animate-slide-up opacity-0"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards'
          }}
          onClick={() => onPromptClick(item.question)}
        >
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">
              {item.category}
            </Badge>
            <p className="text-sm text-foreground">{item.question}</p>
          </div>
        </Card>
      ))}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export const SuggestedQuestions = React.memo(SuggestedQuestionsComponent);
