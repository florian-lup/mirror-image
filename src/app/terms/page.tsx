'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <div className="space-y-6 text-foreground-light/90 dark:text-foreground-dark/90">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Agreement to Terms</h2>
              <p>
                By accessing or using Mirror Image, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                If you do not agree with any of these terms, you are prohibited from using or accessing this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Use License</h2>
              <div className="space-y-2">
                <p>Permission is granted to temporarily access Mirror Image for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to reverse engineer any software contained on Mirror Image</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">User Responsibilities</h2>
              <p>As a user of Mirror Image, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the service for any illegal purposes</li>
                <li>Not impersonate others or create misleading digital copies</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Disclaimer</h2>
              <p>
                The materials on Mirror Image are provided on an &apos;as is&apos; basis. Mirror Image makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Limitations</h2>
              <p>
                In no event shall Mirror Image or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Mirror Image, even if Mirror Image or a Mirror Image authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms of service at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
              </p>
              <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold font-chakra-petch">Contact Information</h2>
              <p>
                Questions about the Terms of Service should be sent to us at{' '}
                <a 
                  href="mailto:terms@mirror-image.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  terms@mirror-image.com
                </a>
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