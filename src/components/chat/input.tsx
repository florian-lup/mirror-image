import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

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

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <Textarea
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 min-h-[52px] max-h-32 resize-none bg-background/50 backdrop-blur"
            rows={1}
            disabled={isTyping}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="absolute right-2 bottom-2 size-8 rounded-full"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ChatInput = React.memo(ChatInputComponent);
