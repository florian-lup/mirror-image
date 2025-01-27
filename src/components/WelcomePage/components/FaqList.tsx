"use client";

const questions = [
  { text: "What's your background and experience?" },
  { text: "What kind of projects have you worked on?" },
  { text: "What technologies do you specialize in?" },
  { text: "What are your interests outside of coding?" }
];

export const FaqList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-w-xl mx-auto px-3 sm:px-0">
      {questions.map((question, index) => (
        <button
          key={index}
          className="text-left p-2.5 sm:p-3 rounded-xl backdrop-blur-sm relative overflow-hidden bg-neutral-800/40 transition-colors duration-200 hover:bg-neutral-700/40"
        >
          <span className="text-[12px] sm:text-[13px] leading-relaxed text-neutral-300 relative z-10">
            {question.text}
          </span>
        </button>
      ))}
    </div>
  );
};