/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'provincia-prod-api.teocoop.site',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  transpilePackages: [
    'lottie-react',
    'lottie-web',
    'react-lottie-player',
    'other-packages-you-use',
  ],
  // Add this to see more detailed build errors
  logging: {
    level: 'verbose',
  },
};

module.exports = nextConfig;
