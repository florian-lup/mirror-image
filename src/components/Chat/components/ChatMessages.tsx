interface ChatMessagesProps {
  initialQuestion?: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ initialQuestion }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
      {initialQuestion && (
        <div className="bg-neutral-800/40 rounded-lg p-2 sm:p-2.5 md:p-3 text-xs sm:text-sm md:text-base text-neutral-300">
          {initialQuestion}
        </div>
      )}
    </div>
  );
}; 