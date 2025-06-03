import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProviderWrapper } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = env.BASE_URL;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Florian Lup',
    template: '%s | Florian Lup',
  },
  description:
    'A dynamic AI-powered personal website that utilizes Retrieval-Augmented Generation (RAG) to deliver instant, precise answers about my background, projects, and expertise.',
  keywords: [
    'florian',
    'lup',
    'florian lup',
    'florian lup personal website',
    'florian lup website',
    'florian lup portfolio',
    'florian lup blog',
    'florian lup projects',
  ],
  authors: [{ name: 'Florian Lup' }],
  creator: 'Florian Lup',
  publisher: 'Florian Lup',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Florian Lup',
    description:
      'A dynamic AI-powered personal website that utilizes Retrieval-Augmented Generation (RAG) to deliver instant, precise answers about my background, projects, and expertise.',
    url: siteUrl,
    siteName: 'Florian Lup',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florian Lup',
    description:
      'A dynamic AI-powered personal website that utilizes Retrieval-Augmented Generation (RAG) to deliver instant, precise answers about my background, projects, and expertise.',
    creator: '@florianlup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Browser prefetch hint */}
        <meta name="next-head-count" content="0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
