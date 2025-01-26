import { PageHeader } from './components/PageHeader';
import { PageFooter } from './components/PageFooter';
import { FaqList } from './components/FaqList';
import { InputArea } from './components/InputArea';

export const WelcomePage = () => {
  return (
    <div className="h-screen bg-neutral-900 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-900 to-neutral-900 pointer-events-none" />
      
      <div className="flex-1 relative">
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <PageHeader />
          
          <main className="flex-1 flex flex-col justify-center -mt-20">
            <div className="space-y-16">
              <section>
                <h1 className="text-4xl font-medium tracking-tight text-neutral-100 sm:text-5xl mb-16 text-center">
                  Ask me anything...
                </h1>
                <InputArea />
              </section>

              <FaqList />
            </div>
          </main>

          <PageFooter />
        </div>
      </div>
    </div>
  );
};  