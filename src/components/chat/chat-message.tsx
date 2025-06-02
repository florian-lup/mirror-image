import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
          {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
        </AvatarFallback>
      </Avatar>

      <Card className={`max-w-[70%] p-4 ${isUser
        ? 'bg-primary text-primary-foreground'
        : 'bg-card border-border/50'
        }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </Card>
    </div>
  );
} 