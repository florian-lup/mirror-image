"use client";

const questions = [
  { text: "How can I get started?", emoji: "🚀" },
  { text: "What topics can I ask about?", emoji: "🤔" },
  { text: "How fast will I get a response?", emoji: "⚡" },
  { text: "Is this service free?", emoji: "💎" }
];

export const FaqList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
      {questions.map((question, index) => (
        <button
          key={index}
          className="text-left p-3 bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors border border-neutral-800 group"
        >
          <span className="text-sm text-neutral-300 flex items-center gap-2 group-hover:text-neutral-200">
            <span className="text-lg">{question.emoji}</span>
            {question.text}
          </span>
        </button>
      ))}
    </div>
  );
};