"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";
import { ArrowUp } from "lucide-react";

const suggestedPrompts = [
  "What are the advantages of using Next.js?",
  "Write code to demonstrate dijkstra's algorithm",
  "Help me write an essay about silicon valley",
  "What is the weather in San Francisco?"
];

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage("");
    setIsTyping(true);

    // Resize textarea back to single line
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Here you would typically send the message to your API
    // For now, we'll just add a placeholder response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Thanks for your message! This is a placeholder response. In a real implementation, this would connect to your AI API."
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
    // Focus the textarea after setting the message
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
              <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-foreground">Hello there!</h1>
                <p className="text-xl text-muted-foreground">How can I help you today?</p>
              </div>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedPrompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-accent/50 transition-colors border-border/50 bg-card/50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <p className="text-sm text-foreground">{prompt}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <ChatMessage key={index} role={msg.role} content={msg.content} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="Send a message..."
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              className="pr-12 min-h-[52px] max-h-32 resize-none bg-background/50 backdrop-blur"
              rows={1}
              disabled={isTyping}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 size-8 rounded-full"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 