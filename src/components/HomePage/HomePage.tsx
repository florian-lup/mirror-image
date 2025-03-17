"use client";

import { PageHeader } from './layouts/PageHeader';
import { InputArea } from './components/InputArea';
import { FaqList } from './components/FaqList';
import { PageFooter } from './layouts/PageFooter';
import { ChatManager } from '../Chat/ChatManager';

export const WelcomePage = () => {
  return (
    <ChatManager>
      {({ handleOpenChat }) => (
        <div className="min-h-screen bg-background flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
              <PageHeader />
              
              <main className="flex-1 flex flex-col justify-center py-4 sm:py-8">
                <div className="space-y-6 sm:space-y-10">
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

              <PageFooter />
            </div>
          </div>
        </div>
      )}
    </ChatManager>
  );
};  