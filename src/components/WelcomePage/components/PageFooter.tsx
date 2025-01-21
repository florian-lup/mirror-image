import Link from 'next/link';

export const PageFooter = () => {
  return (
    <footer className="py-8 border-t border-neutral-800">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="text-sm text-neutral-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} Florian Lup. All rights reserved.
        </div>
        <div className="flex space-x-8">
          <Link 
            href="https://github.com" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link 
            href="https://linkedin.com" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link 
            href="https://twitter.com" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
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