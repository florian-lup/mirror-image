import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Optimize CSS loading
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components/ui', 'lucide-react', '@radix-ui/react-*'],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.florianlup.com',
      },
    ],
  },

  // Compression
  compress: true,

  // Powered by header
  poweredByHeader: false,

  // Trailing slash
  trailingSlash: false,
};

export default nextConfig;
