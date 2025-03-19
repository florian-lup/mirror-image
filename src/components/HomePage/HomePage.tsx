"use client";

import { useState } from 'react';
import { useChat } from '@/hooks';
import { PageHeader } from './layouts/PageHeader';
import { InputArea } from './components/InputArea';
import { FaqList } from './components/FaqList';
import { PageFooter } from './layouts/PageFooter';
import { ChatContainer } from '../Chat/ChatContainer';

export const WelcomePage = () => {
  // Track if chat UI is visible
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Get chat operations from hook
  const { messages, isLoading, error, sendMessage, clearMessages, stopLoading } = useChat();

  /**
   * Opens the chat and sends the initial message.
   * Prevents duplicate messages by checking if chat is already open.
   */
  const handleOpenChat = (question: string) => {
    if (!isChatOpen) {
      setIsChatOpen(true);
      sendMessage(question);
    }
  };

  /**
   * Closes the chat, clears messages, and resets the chat state.
   */
  const handleCloseChat = () => {
    setIsChatOpen(false);
    clearMessages();
    stopLoading();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader />
      
      <div className="flex-1 flex items-center justify-center py-8 md:py-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">              
          <main>
            <div className="space-y-8 sm:space-y-12">
              <section>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 sm:mb-6 md:mb-8 text-center">
                  Ask me anything...
                </h1>
                <div className="max-w-2xl mx-auto px-4 sm:px-0">
                  <InputArea onAskQuestion={handleOpenChat} />
                </div>
              </section>

              <section className="max-w-2xl mx-auto w-full px-4 sm:px-0">
                <FaqList onQuestionClick={handleOpenChat} />
              </section>
            </div>
          </main>
        </div>
      </div>
      
      <PageFooter />

      {/* Render chat UI */}
      <ChatContainer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
        stopLoading={stopLoading}
      />
    </div>
  );
};  