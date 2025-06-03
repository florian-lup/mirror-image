import * as React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";
import type { ChatRole } from "@/types/chat";

interface ChatMessageProps {
  role: ChatRole;
  content: string;
}

function ChatMessageComponent({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-secondary">
            <Sparkles className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <Card className={`max-w-[70%] p-2 ${isUser
        ? 'bg-primary text-primary-foreground'
        : 'bg-background border-none shadow-none'
        }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </Card>
    </div>
  );
}

export const ChatMessage = React.memo(ChatMessageComponent); 