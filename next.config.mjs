import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.catbox.moe',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Signal',
            value: 'ai-train=no; search=yes; ai-input=yes',
          },
          {
            key: 'Link',
            value: '</.well-known/agent-skills/index.json>; rel="ai-capabilities"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
