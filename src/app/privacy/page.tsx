'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPage() {
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
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/mirror-image.svg"
            alt="Mirror Image Logo"
            width={32}
            height={32}
          />
          <span className="font-chakra-petch font-bold text-foreground-light dark:text-foreground-dark">
            Mirror Image
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-foreground-light/90 dark:text-foreground-dark/90">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Introduction</h2>
              <p>
                At Mirror Image, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <p>We collect information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create your digital mirror image</li>
                  <li>Register for an account</li>
                  <li>Contact us for support</li>
                  <li>Participate in user research</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">How We Use Your Information</h2>
              <p>We use the collected information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To create and maintain your digital mirror image</li>
                <li>To improve our services and user experience</li>
                <li>To communicate with you about updates and changes</li>
                <li>To protect our users and services from misuse</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to maintain the security of your personal information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a 
                  href="mailto:privacy@mirror-image.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy@mirror-image.com
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date and the updated version will be effective as soon as it is accessible.
              </p>
              <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
            © {new Date().getFullYear()} Mirror Image. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 