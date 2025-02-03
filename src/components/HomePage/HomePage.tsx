"use client";

import { useState } from 'react';
import { PageHeader } from './layouts/PageHeader';
import { InputArea } from './components/InputArea';
import { FaqList } from './components/FaqList';
import { PageFooter } from './layouts/PageFooter';
import { ChatContainer } from '../Chat/ChatContainer';

export const WelcomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');

  const handleOpenChat = (question: string) => {
    setChatQuestion(question);
    setIsChatOpen(true);
  };

  return (
    <div className="h-screen bg-neutral-900 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-900 to-neutral-900 pointer-events-none" />
      
      <div className="flex-1 relative">
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <PageHeader />
          
          <main className="flex-1 flex flex-col justify-center -mt-20 sm:-mt-20 md:-mt-16">
            <div className="space-y-8 sm:space-y-16">
              <section>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-300 mb-8 sm:mb-16 text-center px-4">
                  Ask me anything...
                </h1>
                <InputArea onAskQuestion={handleOpenChat} />
              </section>

              <FaqList onQuestionClick={handleOpenChat} />
            </div>
          </main>

          <PageFooter />
        </div>
      </div>

      <ChatContainer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuestion={chatQuestion}
      />
    </div>
  );
};  