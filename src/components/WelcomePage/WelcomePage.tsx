import { PageHeader } from './components/PageHeader';
import { PageFooter } from './components/PageFooter';
import { FaqList } from './components/FaqList';
import { InputArea } from './components/InputArea';

export const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader />
          
          <main className="py-16">
            <div className="space-y-6">
              <section className="pt-16">
                <h1 className="text-3xl tracking-tight text-neutral-300 sm:text-4xl mb-16 text-center">
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