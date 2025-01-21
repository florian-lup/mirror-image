import Link from 'next/link';

export const PageFooter = () => {
  return (
    <footer className="py-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="text-sm text-gray-500 mb-4 md:mb-0">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="https://github.com" className="text-sm text-gray-600 hover:text-gray-900">
            GitHub
          </Link>
          <Link href="https://linkedin.com" className="text-sm text-gray-600 hover:text-gray-900">
            LinkedIn
          </Link>
          <Link href="https://twitter.com" className="text-sm text-gray-600 hover:text-gray-900">
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