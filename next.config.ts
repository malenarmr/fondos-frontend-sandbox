/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['provincia-prod-api.teocoop.site'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'provincia-prod-api.teocoop.site',
        port: '',
        pathname: '/uploads/**',
      },
    ],

    deviceSizes: [
      320, 375, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    formats: ['image/avif', 'image/webp'],

    minimumCacheTTL: 60 * 60, // 1h
  },

  transpilePackages: [
    'lottie-react',
    'lottie-web',
    'react-lottie-player',
    'other-packages-you-use',
  ],

  logging: {
    level: 'verbose',
  },
};

module.exports = nextConfig;
