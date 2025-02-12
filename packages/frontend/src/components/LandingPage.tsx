'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaSquareXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

export default function LandingPage() {
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

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
          />
          <span className="font-chakra-petch font-semibold dark:text-gray-300">
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-xl font-bold font-chakra-petch">
              Immortality 2.0
            </span>
            <p className="text-7xl font-bold text-gray-600 dark:text-gray-300 font-geist-sans">
              Live Forever as Your Digital Self
            </p>
          </div>

          {/* Disclaimer */}
          <div className="relative">
            <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-green-400/20">
              <div className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border-t border-blue-200/10 text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <h2 className="text-2xl font-semibold font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                    Important Disclaimer
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  This is a research project intended for ethical and educational purposes only.
                  We strictly prohibit any malicious use, impersonation, or misrepresentation.
                  By using this platform, you agree to use it responsibly and in accordance with all
                  applicable laws and regulations.
                </p>
                <button
                  onClick={() => setIsDisclaimerAccepted(true)}
                  className={`w-full py-3.5 px-6 rounded-xl font-medium transition-colors duration-300 ${
                    isDisclaimerAccepted
                      ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                      : 'bg-gradient-to-r from-blue-600/20 to-green-400/20 hover:from-blue-600/30 hover:to-green-400/30 text-gray-700 dark:text-gray-200 border border-blue-400/20'
                  }`}
                  disabled={isDisclaimerAccepted}
                >
                  {isDisclaimerAccepted ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Disclaimer Accepted
                    </span>
                  ) : (
                    'I Accept the Disclaimer'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-8 flex items-center justify-center gap-4">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href={isDisclaimerAccepted ? "/chat" : "#"}
                    className={`group relative inline-block font-geist-sans ${!isDisclaimerAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => !isDisclaimerAccepted && e.preventDefault()}
                    aria-disabled={!isDisclaimerAccepted}
                  >
                    <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-green-400 ${isDisclaimerAccepted ? 'opacity-70 group-hover:opacity-100' : 'opacity-30'} transition-opacity duration-200`} />
                    <div className={`relative rounded-lg bg-[var(--background)] px-12 py-4 transition-all duration-200 ${isDisclaimerAccepted ? 'group-hover:scale-[0.98] group-hover:translate-y-0.5' : ''}`}>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-lg font-semibold">
                        Start Chatting
                      </span>
                    </div>
                  </Link>
                </Tooltip.Trigger>
                {!isDisclaimerAccepted && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm"
                      sideOffset={5}
                    >
                      Please accept the disclaimer first
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href={isDisclaimerAccepted ? "/waitlist" : "#"}
                    className={`group relative inline-block font-geist-sans ${!isDisclaimerAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => !isDisclaimerAccepted && e.preventDefault()}
                    aria-disabled={!isDisclaimerAccepted}
                  >
                    <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-green-400/20 ${isDisclaimerAccepted ? 'opacity-70 group-hover:opacity-100' : 'opacity-30'} transition-opacity duration-200`} />
                    <div className={`relative rounded-lg border border-blue-400/20 px-12 py-4 transition-all duration-200 ${isDisclaimerAccepted ? 'group-hover:scale-[0.98] group-hover:translate-y-0.5' : ''}`}>
                      <span className="relative text-gray-700 dark:text-gray-200 text-lg font-semibold">
                        Join Waitlist
                      </span>
                    </div>
                  </Link>
                </Tooltip.Trigger>
                {!isDisclaimerAccepted && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm"
                      sideOffset={5}
                    >
                      Please accept the disclaimer first
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>

          {/* Project Description */}
          <div className="space-y-6 relative">
            <div className="prose dark:prose-invert mx-auto">
              <p className="text-xl leading-relaxed max-w-2xl mx-auto">
                Mirror Image is a cutting-edge research project that enables you to create
                AI clones of yourself, preserving your thoughts, mannerisms, and communication style
                in a digital format.
              </p>
            </div>
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
