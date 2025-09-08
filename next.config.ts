/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you have "type": "module" in package.json, switch to ESM export at bottom.
  images: {
    // Simple host allowlist (fallback)
    domains: ['provincia-prod-api.teocoop.site'],

    // Stricter allowlist by pattern (keeps /uploads/** only)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'provincia-prod-api.teocoop.site',
        port: '',
        pathname: '/uploads/**',
      },
    ],

    // Make sure requested widths are valid (includes 750 and 1920)
    deviceSizes: [
      320, 375, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Modern formats (Next auto-negotiates)
    formats: ['image/avif', 'image/webp'],

    // Optional: improve cache
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
// If using ESM: export default nextConfig;
