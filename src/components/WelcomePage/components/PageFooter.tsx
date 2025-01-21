import Link from 'next/link';

export const PageFooter = () => {
  return (
    <footer className="py-8 border-t border-accent-light/20 dark:border-accent-dark/20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="text-sm text-content-light dark:text-content-dark mb-4 md:mb-0">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link 
            href="https://github.com" 
            className="text-sm text-content-light dark:text-content-dark hover:text-highlight-DEFAULT dark:hover:text-highlight-DEFAULT transition-colors"
          >
            GitHub
          </Link>
          <Link 
            href="https://linkedin.com" 
            className="text-sm text-content-light dark:text-content-dark hover:text-highlight-DEFAULT dark:hover:text-highlight-DEFAULT transition-colors"
          >
            LinkedIn
          </Link>
          <Link 
            href="https://twitter.com" 
            className="text-sm text-content-light dark:text-content-dark hover:text-highlight-DEFAULT dark:hover:text-highlight-DEFAULT transition-colors"
          >
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
};

//add a copyright here

//add a privacy policy here

//add a terms of service here 