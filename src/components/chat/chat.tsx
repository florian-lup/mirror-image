"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./messages";
import { TypingIndicator } from "./typing-indicator";
import { SuggestedQuestions } from "./suggested-questions";
import { ChatInput } from "./input";
import { HelpDialog } from "./help";
import { Button } from "@/components/ui/button";
import Header from "../header";

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsTyping(true);

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

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main chat content area */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="max-w-3xl mx-auto p-6 h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col justify-center items-start h-full text-left">
              {/* Initial greeting when no messages exist */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-foreground">Hello there!</h1>
                <p className="text-xl text-muted-foreground">
                  How can I{" "}
                  <HelpDialog>
                    <Button variant="link">
                      help
                    </Button>
                  </HelpDialog>
                  {" "}you today?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Display conversation history */}
              {messages.map((msg, index) => (
                <ChatMessage key={index} role={msg.role} content={msg.content} />
              ))}
              {/* Show typing indicator when AI is responding */}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed input area at the bottom */}
      <div>
        {/* Show suggested questions above input only when no messages */}
        {messages.length === 0 && (
          <div className="max-w-3xl mx-auto p-4 pb-2">
            <SuggestedQuestions onPromptClick={handlePromptClick} />
          </div>
        )}

        {/* Input area */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
} 