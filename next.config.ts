import { env } from './env.mjs';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: env.NEXT_PUBLIC_IMGIX_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: env.NEXT_PUBLIC_S3_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: env.NEXT_PUBLIC_VL_IMGIX_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: env.NEXT_PUBLIC_CARVANA_S3_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
