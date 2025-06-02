import * as React from "react";
import { Card } from "@/components/ui/card";

const suggestedQuestions = [
  "What are the advantages of using Next.js?",
  "Write code to demonstrate dijkstra's algorithm",
  "Help me write an essay about silicon valley",
  "What is the weather in San Francisco?"
];

interface SuggestedQuestionsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedQuestionsComponent = ({ onPromptClick }: SuggestedQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
      {suggestedQuestions.map((prompt, index) => (
        <Card
          key={index}
          className="p-4 cursor-pointer hover:bg-accent/50 transition-colors border-border/50 bg-card/50"
          onClick={() => onPromptClick(prompt)}
        >
          <p className="text-sm text-foreground">{prompt}</p>
        </Card>
      ))}
    </div>
  );
};

export const SuggestedQuestions = React.memo(SuggestedQuestionsComponent);
