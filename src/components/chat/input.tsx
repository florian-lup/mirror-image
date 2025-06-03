import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { useCallback } from "react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
}

const ChatInputComponent = ({ message, setMessage, onSendMessage, isTyping }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage();
  };

  const setMessageRef = useCallback((val: string) => setMessage(val), []);
  const sendRef = useCallback(() => handleSendMessage(), [handleSendMessage]);

  return (
    <div className="max-w-3xl mx-auto p-4 pt-2">
      {/* Composite input: textarea + footer */}
      <div className="rounded-md border overflow-hidden p-2">
        {/* Text area */}
        <Textarea
          id="chat-input"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessageRef(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full resize-none border-none rounded-none p-3 min-h-[72px] max-h-42 shadow-none"
          rows={2}
          disabled={isTyping}
        />

        {/* Footer */}
        <div className="flex justify-end gap-2 p-2">
          <Button
            size="icon"
            onClick={sendRef}
            disabled={!message.trim() || isTyping}
            className="size-9 rounded-full"
          >
            <ArrowUp className="size-4" />
          </Button>
          {/* Future buttons can be added here */}
        </div>
      </div>
    </div>
  );
};

export const ChatInput = React.memo(ChatInputComponent);
