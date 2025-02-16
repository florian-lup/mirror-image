'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaSquareXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeToggle } from './theme';

export default function LandingPage() {
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark relative">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-950/10" />
      
      {/* Tech-inspired background pattern with fade */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Vertical fade masks */}
        <div className="absolute inset-y-0 left-0 w-[20vw] bg-gradient-to-r from-background-light dark:from-background-dark to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[20vw] bg-gradient-to-l from-background-light dark:from-background-dark to-transparent" />
        
        {/* Horizontal fade masks */}
        <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-background-light dark:from-background-dark to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/mirror-image.svg"
            alt="Mirror Image Logo"
            width={32}
            height={32}
          />
          <span className="font-chakra-petch font-bold text-foreground-light dark:text-foreground-dark">
            Mirror Image
          </span>
        </div>
        <nav className="flex items-center">
          <ThemeToggle />
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full space-y-16 text-center relative z-10">
          {/* Hero Section */}
          <div className="space-y-6 sm:space-y-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-lg sm:text-xl font-bold font-chakra-petch">
              Immortality 2.0
            </span>
            <p className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground-light dark:text-foreground-dark font-geist-sans">
              Live Forever as Your Digital Self
            </p>
          </div>

          {/* Disclaimer */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px]">
              <div className="bg-white/[0.02] dark:bg-gray-900/[0.02] backdrop-blur-[2px] p-6 sm:p-8 rounded-2xl border border-blue-400/10 text-left">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <h2 className="text-xl sm:text-2xl font-semibold font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                    Important Disclaimer
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8">
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
          <div className="pt-8 flex items-center justify-center gap-8">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="flex flex-col items-center gap-2">
                    <Link
                      href={isDisclaimerAccepted ? "/chat" : "#"}
                      className={`group relative inline-block font-geist-sans ${!isDisclaimerAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={(e) => !isDisclaimerAccepted && e.preventDefault()}
                      aria-disabled={!isDisclaimerAccepted}
                    >
                      <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/80 to-green-400/80 ${isDisclaimerAccepted ? 'opacity-70 group-hover:opacity-100' : 'opacity-30'} transition-opacity duration-200`} />
                      <div className={`relative rounded-lg bg-background-light dark:bg-background-dark px-8 sm:px-16 py-2.5 sm:py-3 transition-all duration-200 ${isDisclaimerAccepted ? 'group-hover:scale-[0.98] group-hover:translate-y-0.5' : ''}`}>
                        <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 font-semibold text-base sm:text-lg">
                          Chat Now
                        </span>
                      </div>
                    </Link>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                      Try one-on-one chat with president Trump
                    </p>
                  </div>
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
                  <div className="flex flex-col items-center gap-2">
                    <Link
                      href={isDisclaimerAccepted ? "/waitlist" : "#"}
                      className={`group relative inline-block font-geist-sans ${!isDisclaimerAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={(e) => !isDisclaimerAccepted && e.preventDefault()}
                      aria-disabled={!isDisclaimerAccepted}
                    >
                      <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/15 to-green-400/15 ${isDisclaimerAccepted ? 'opacity-70 group-hover:opacity-100' : 'opacity-30'} transition-opacity duration-200`} />
                      <div className={`relative rounded-lg bg-background-light/50 dark:bg-background-dark/50 border border-blue-400/20 px-8 sm:px-16 py-2.5 sm:py-3 transition-all duration-200 ${isDisclaimerAccepted ? 'group-hover:scale-[0.98] group-hover:translate-y-0.5' : ''}`}>
                        <span className="relative text-foreground-light/90 dark:text-foreground-dark/90 font-semibold text-base sm:text-lg">
                          Sign Up
                        </span>
                      </div>
                    </Link>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                      Join the waitlist to get your mirror image
                    </p>
                  </div>
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
          <div className="space-y-8 sm:space-y-12 relative">
            {/* Top border with gradient */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px] mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-white/[0.02] dark:bg-gray-900/[0.02] backdrop-blur-[2px] h-0" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-0">
              <div className="relative rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px]">
                <div className="relative bg-background-light/50 dark:bg-background-dark/50 rounded-2xl border border-blue-400/10">
                  <p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-8 py-4 sm:py-6 text-foreground-light/90 dark:text-foreground-dark/90 font-geist-sans text-center">
                    Mirror Image enables you to create interactive AI clones, preserving your thoughts, memories, and communication style
                    in a digital format.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
              {/* Multimodal Interactions Card */}
              <div className="group relative h-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-green-400/20 group-hover:from-blue-600/30 group-hover:to-green-400/30 transition-all duration-300" />
                <div className="relative h-full bg-background-light/50 dark:bg-background-dark/50 p-4 sm:p-6 rounded-2xl border border-blue-400/10 flex flex-col items-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r from-blue-600/10 to-green-400/10 flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-center">
                    Multimodal Interactions
                  </h3>
                  <p className="text-sm sm:text-base text-foreground-light/80 dark:text-foreground-dark/80 flex-grow text-center">
                    Experience text, audio and video avatars that speak with your voice and style.
                  </p>
                </div>
              </div>

              {/* Emotional Depth Card */}
              <div className="group relative h-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-green-400/20 group-hover:from-blue-600/30 group-hover:to-green-400/30 transition-all duration-300" />
                <div className="relative h-full bg-background-light/50 dark:bg-background-dark/50 p-4 sm:p-6 rounded-2xl border border-blue-400/10 flex flex-col items-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r from-blue-600/10 to-green-400/10 flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-center">
                    Emotional Depth
                  </h3>
                  <p className="text-sm sm:text-base text-foreground-light/80 dark:text-foreground-dark/80 flex-grow text-center">
                    The AI clone can capture your quirks, flaws, and inside jokes, not just facts.
                  </p>
                </div>
              </div>

              {/* Ownership Control Card */}
              <div className="group relative h-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-green-400/20 group-hover:from-blue-600/30 group-hover:to-green-400/30 transition-all duration-300" />
                <div className="relative h-full bg-background-light/50 dark:bg-background-dark/50 p-4 sm:p-6 rounded-2xl border border-blue-400/10 flex flex-col items-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r from-blue-600/10 to-green-400/10 flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-center">
                    Full Ownership
                  </h3>
                  <p className="text-sm sm:text-base text-foreground-light/80 dark:text-foreground-dark/80 flex-grow text-center">
                    Maintain complete control over your data and access rights to your digital self.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="space-y-8 sm:space-y-12 relative">
            {/* Top border with gradient */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px] mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-white/[0.02] dark:bg-gray-900/[0.02] backdrop-blur-[2px] h-0" />
            </div>

            {/* Technical Overview */}
            <div className="max-w-4xl mx-auto px-4 sm:px-0">
              <div className="relative rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px]">
                <div className="relative bg-background-light/50 dark:bg-background-dark/50 rounded-2xl border border-blue-400/10 p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400 text-center">
                    Technical Specifications
                  </h2>
                  <p className="text-lg sm:text-xl leading-relaxed text-foreground-light/90 dark:text-foreground-dark/90 font-geist-sans text-center mb-8">
                    Your mirror image is an autonomous agent that can learn and grow just like a normal person
                  </p>

                  {/* Technical Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Dynamic Memory */}
                    <div className="group relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 to-green-400/20 group-hover:from-blue-600/30 group-hover:to-green-400/30 transition-all duration-300" />
                      <div className="relative h-full bg-background-light/50 dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-blue-400/10">
                        <h3 className="text-lg font-semibold mb-2 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                          Dynamic Memory
                        </h3>
                        <p className="text-sm text-foreground-light/80 dark:text-foreground-dark/80">
                          Features an advanced neural memory system that continuously evolves through interactions. Your digital self remembers past conversations, learns from new experiences, and adapts its responses based on accumulated context, creating an ever-growing personal knowledge base that becomes more refined over time.
                        </p>
                      </div>
                    </div>

                    {/* Research Capabilities */}
                    <div className="group relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 to-green-400/20 group-hover:from-blue-600/30 group-hover:to-green-400/30 transition-all duration-300" />
                      <div className="relative h-full bg-background-light/50 dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-blue-400/10">
                        <h3 className="text-lg font-semibold mb-2 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                          Research Capabilities
                        </h3>
                        <p className="text-sm text-foreground-light/80 dark:text-foreground-dark/80">
                          Equipped with autonomous research abilities to stay current and expand knowledge. Your digital self can analyze information from various sources, form connections between different topics, and integrate new insights with existing knowledge, ensuring responses are always well-informed and up-to-date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top border with gradient */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-400/10 to-green-400/10 p-[1px] mb-6 sm:mb-8">
            <div className="bg-white/[0.02] dark:bg-gray-900/[0.02] backdrop-blur-[2px] h-0" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 md:gap-16">
            {/* Company Info */}
            <div className="space-y-3 sm:space-y-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Image
                  src="/mirror-image.svg"
                  alt="Mirror Image Logo"
                  width={24}
                  height={24}
                  className="opacity-80"
                />
                <span className="font-chakra-petch font-bold text-sm text-foreground-light/80 dark:text-foreground-dark/80">
                  Mirror Image
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                © {new Date().getFullYear()} Mirror Image. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-chakra-petch text-xs sm:text-sm font-semibold text-foreground-light/80 dark:text-foreground-dark/80 text-center">
                Quick Links
              </h3>
              <div className="flex gap-4 sm:gap-6 items-center justify-center">
                <Link href="/privacy" className="text-xs sm:text-sm text-foreground-light/60 dark:text-foreground-dark/60 hover:text-foreground-light dark:hover:text-foreground-dark transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-xs sm:text-sm text-foreground-light/60 dark:text-foreground-dark/60 hover:text-foreground-light dark:hover:text-foreground-dark transition-colors">
                  Terms
                </Link>
              </div>
            </div>

            {/* Connect */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-chakra-petch text-xs sm:text-sm font-semibold text-foreground-light/80 dark:text-foreground-dark/80 text-center md:text-right">
                Connect
              </h3>
              <div className="flex gap-4 justify-center md:justify-end">
                <a 
                  href="mailto:contact@mirror-image.com"
                  className="text-foreground-light/60 dark:text-foreground-dark/60 hover:text-foreground-light dark:hover:text-foreground-dark transition-colors"
                  aria-label="Email us"
                >
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://twitter.com/mirror_image"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-light/60 dark:text-foreground-dark/60 hover:text-foreground-light dark:hover:text-foreground-dark transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <FaSquareXTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
