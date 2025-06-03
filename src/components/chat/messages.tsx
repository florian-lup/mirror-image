import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

function ChatMessageComponent({ role, content }: ChatMessageType) {
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

      <Card
        className={`max-w-[70%] p-2 ${isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-background border-none shadow-none'
          }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm dark:prose-invert break-words"
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              a: ({ node: _unused, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:opacity-80"
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </Card>
    </div>
  );
}

export const ChatMessage = React.memo(ChatMessageComponent); 