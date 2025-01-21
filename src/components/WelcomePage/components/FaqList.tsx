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
      {questions.map(({ text, emoji }, index) => (
        <button
          key={index}
          className="text-left p-3 bg-primary-light/5 dark:bg-primary-dark/5 border border-accent-light dark:border-accent-dark text-content-light dark:text-content-dark rounded-md hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors"
        >
          <span className="text-sm flex items-center gap-2">
            <span className="text-lg">{emoji}</span>
            {text}
          </span>
        </button>
      ))}
    </div>
  );
};