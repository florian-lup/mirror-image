import { PageHeader } from './components/PageHeader';
import { PageFooter } from './components/PageFooter';
import { FaqList } from './components/FaqList';
import { InputArea } from './components/InputArea';

export const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader />
          
          <main className="py-16">
            <div className="space-y-6">
              <section className="pt-16">
                <h1 className="text-4xl font-bold tracking-tight text-content-light dark:text-content-dark sm:text-5xl mb-16 text-center">
                  What do you want to know?
                </h1>
                <InputArea />
              </section>

              <FaqList />
            </div>
          </main>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <PageFooter />
      </div>
    </div>
  );
};  