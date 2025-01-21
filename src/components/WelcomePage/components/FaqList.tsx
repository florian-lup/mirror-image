"use client";

const questions = [
  "How can I get started?",
  "What topics can I ask about?",
  "How fast will I get a response?",
  "Is this service free?"
];

export const FaqList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
      {questions.map((question, index) => (
        <button
          key={index}
          className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm text-gray-900">{question}</span>
        </button>
      ))}
    </div>
  );
};