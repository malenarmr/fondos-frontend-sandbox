// next.config.ts
import type { NextConfig } from 'next';

const ORIGIN =
  process.env.CORS_ALLOW_ORIGIN || 'https://www.provinciafondos.com.ar';
const TWO_YEARS = 60 * 60 * 24 * 730;
const isProd = process.env.NODE_ENV === 'production';

// CSP base (replica el enfoque de Bursátil)
// En dev agregamos 'unsafe-eval' y ws/http localhost para que no rompa HMR.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",

  // Imágenes (incluye tu API y CDNs típicos + thumbs de YouTube)
  "img-src 'self' data: blob: https://provincia-prod-api.teocoop.site https://*.amazonaws.com https://*.cloudfront.net https://*.r2.cloudflarestorage.com https://*.teocoop.site https://img.youtube.com",

  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",

  // Scripts (como Bursátil: permite inline; en dev sumamos 'unsafe-eval')
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://go.botmaker.com${isProd ? '' : " 'unsafe-eval' http://localhost:3000"}`,

  // Conexiones (tu API + GA; en dev añadimos ws/http localhost)
  `connect-src 'self' https://provincia-prod-api.teocoop.site/ https://www.google-analytics.com${isProd ? '' : ' http://localhost:3000 ws://localhost:3000'}`,

  // iframes (YouTube)
  "frame-src 'self' https://www.youtube.com",

  'upgrade-insecure-requests',
].join('; ');

const securityHeaders: { key: string; value: string }[] = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Igual a Bursátil: referrer más flexible para analytics/embeds
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: `max-age=${TWO_YEARS}; includeSubDomains; preload`,
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  // Nota: mantenemos ACAO aquí como en Bursátil; el middleware lo corrige si aparece wildcard
  { key: 'Access-Control-Allow-Origin', value: ORIGIN },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'provincia-prod-api.teocoop.site',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.teocoop.site',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  logging: { fetches: { fullUrl: true } },

  async headers() {
    return [
      // App entera
      { source: '/:path*', headers: securityHeaders },

      // API: no cache (además de los security headers)
      {
        source: '/api/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },

      // Estáticos: cache fuerte
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
