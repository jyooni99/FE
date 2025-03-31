import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
});

const nextConfig: NextConfig = {
  async rewrites() {
    const isLocal = process.env.NODE_ENV === 'development';
    const apiUrl = isLocal
      ? process.env.NEXT_PUBLIC_HTTP_API_URL
      : process.env.NEXT_PUBLIC_HTTPS_API_URL;

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default withPWA(nextConfig);
