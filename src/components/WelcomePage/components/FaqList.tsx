"use client";

const questions = [
  { text: "What's your background and experience?" },
  { text: "What kind of projects have you worked on?" },
  { text: "What technologies do you specialize in?" },
  { text: "What are your interests outside of coding?" }
];

export const FaqList = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
      {questions.map((question, index) => (
        <button
          key={index}
          className="text-left p-3 rounded-xl transition-all duration-300 backdrop-blur-sm
            bg-neutral-800/40 hover:bg-neutral-700/60 
            group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/25 to-transparent opacity-0 group-hover:opacity-100 
            transform -translate-x-full animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
          <span className="text-[13px] leading-relaxed text-neutral-300 group-hover:text-neutral-100 relative z-10">
            {question.text}
          </span>
        </button>
      ))}
    </div>
  );
};