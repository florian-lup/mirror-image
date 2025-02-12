import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaSquareXTwitter } from 'react-icons/fa6';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-950/10" />
      
      {/* Tech-inspired background pattern with fade */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Vertical fade masks */}
        <div className="absolute inset-y-0 left-0 w-[20vw] bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[20vw] bg-gradient-to-l from-[var(--background)] to-transparent" />
        
        {/* Horizontal fade masks */}
        <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-[var(--background)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 py-3 flex justify-between items-center border-b border-gray-200/10">
        <div className="flex items-center gap-2">
          <Image
            src="/mirror-image.svg"
            alt="Mirror Image Logo"
            width={32}
            height={32}
            className="opacity-90"
          />
          <span className="font-chakra-petch font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
            Mirror Image
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a 
            href="mailto:contact@mirror-image.com"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Email us"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com/mirror_image"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Follow us on Twitter"
          >
            <FaSquareXTwitter className="w-5 h-5" />
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full space-y-16 text-center relative z-10">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/mirror-image.svg"
                alt="Mirror Image Logo"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <h1 className="text-6xl font-bold font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
              Mirror Image
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 font-geist-sans">
              Create AI-powered digital replicas of yourself
            </p>
          </div>

          {/* Project Description */}
          <div className="space-y-6">
            <div className="prose dark:prose-invert mx-auto">
              <p className="text-xl leading-relaxed max-w-2xl mx-auto">
                Mirror Image is a cutting-edge research project that enables you to create
                AI clones of yourself, preserving your thoughts, mannerisms, and communication style
                in a digital format.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="relative">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl max-w-2xl mx-auto border border-blue-200/20">
              <h2 className="text-2xl font-semibold mb-4 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                Important Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This is a research project intended for ethical and educational purposes only.
                We strictly prohibit any malicious use, impersonation, or misrepresentation.
                By using this platform, you agree to use it responsibly and in accordance with all
                applicable laws and regulations.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link
              href="/chat"
              className="group relative inline-block font-geist-sans"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-green-400 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="relative rounded-lg bg-[var(--background)] px-12 py-4 transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-lg font-semibold">
                  Start Chatting
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-4 py-3 flex justify-between items-center border-t border-gray-200/10">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Mirror Image
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/privacy" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
