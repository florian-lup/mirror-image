"use client";

interface Question {
  text: string;
}

interface FaqListProps {
  onQuestionClick: (question: string) => void;
  questions: Question[];
}

export const FaqList: React.FC<FaqListProps> = ({ onQuestionClick, questions }) => {
  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question.text)}
            className="text-left p-2.5 sm:p-3 rounded-xl backdrop-blur-sm relative overflow-hidden bg-neutral-800/40 transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50"
          >
            <span className="text-[12px] sm:text-[14px] leading-relaxed text-neutral-300 relative z-10">
              {question.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};