import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

      <main className="max-w-4xl w-full space-y-16 text-center relative z-10">
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
          <h1 className="text-6xl font-bold font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
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
          <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl max-w-2xl mx-auto border border-gray-200/20 shadow-xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-30" />
            <div className="relative">
              <h2 className="text-2xl font-semibold mb-4 font-chakra-petch bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Important Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This is an academic research project intended for ethical and educational purposes only.
                We strictly prohibit any malicious use, impersonation, or misrepresentation.
                By using this platform, you agree to use it responsibly and in accordance with all
                applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Link
            href="/chat"
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-10 rounded-xl transition-colors duration-200 hover:from-emerald-700 hover:to-teal-700 font-geist-sans text-lg shadow-lg"
          >
            Start Chatting
          </Link>
        </div>
      </main>
    </div>
  );
}
