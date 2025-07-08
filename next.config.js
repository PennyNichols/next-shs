/* eslint-disable max-len */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Helps identify potential problems in an application by running extra checks in development.
  reactStrictMode: true,

  // Image Optimization Domains (for Firebase Storage)
  // Must Whitelist remotePatterns for all external image platforms,
  // Next.js Image component cannot optimize the files without it.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Firebase Storage domain
        port: '',
        pathname: '/v0/b/**', // Wildcard for all buckets and paths
      },
      // When we begin using other image sources (e.g., Google Business, Facebok, etc.)
      // add them here as well.
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },

  // Environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
  // Others are server-side only (e.g., for Firebase Admin SDK).
  env: {
    // Client-side Firebase config (required for Firebase SDK in browser)
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL, // For client-side admin if needed, but usually server-side
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,

    // Server-side Firebase Admin SDK credentials (do NOT prefix with NEXT_PUBLIC_)
    // These should ONLY be used in API routes, getServerSideProps, or other Node.js environments.
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY, // The actual private key from Firebase Admin SDK JSON
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL, // Should match client_email from Admin SDK JSON
    // ... any other server-side env vars
  },

  // Optimize and clean up code for production.
  // Reduces bundle size in production by removing specific React properties
  // like `prop-types` and `__source` that are only useful for development debugging.
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Remove console.log statements in production builds.
    // Be careful with this; ensure you don't remove critical error logging.
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  // Standalone for Docker/Container deployments) that includes everything needed to run the app.
  output: 'standalone',

  // Configurations we might encounter, but likely won't need immediately:
  // - assetPrefix: For serving assets from a CDN.
  // - basePath: If your app is not at the root of your domain (e.g., example.com/my-app).
  // - webpack: For advanced custom webpack configurations (avoid if possible).
};

// This is for visualizing your JavaScript bundle sizes to identify large dependencies.
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
