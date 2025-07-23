import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import type { Metadata, Viewport } from 'next';

import { AppProviders } from './providers';

import NavBar from '@/components/layout/NavBar/NavBar';
import Footer from '@/components/layout/Footer/Footer';
import { ShareButton } from '@/components/action-buttons';

export const metadata: Metadata = {
  title: {
    template: '%s | SHS Site',
    default: 'SHS Site',
  },
  description:
    'SHS provides expert home services in Port Charlotte, FL. Our skilled home service technicians handle all your handyman needs, from minor repairs to home improvements.',
  metadataBase: new URL('https://www.shs-florida.com'),
  openGraph: {
    title: 'SHS Site',
    url: 'https://www.shs-florida.com',
    siteName: 'SHS Site',
    description:
      'SHS provides expert home services in Port Charlotte, FL. Our skilled home service technicians handle all your handyman needs, from minor repairs to home improvements.',
    images: [
      {
        url: '/og-image.png', // **OG image must be in the /public folder**
        width: 1200,
        height: 630,
        alt: 'SHS Site - Expert Home Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
    ],
  },
  // Add other global metadata here (e.g., openGraph, twitter, etc.)
  // See: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  themeColor: '#00112c',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/*
          AppProviders handles Emotion/MUI Theme, AuthContext, and FirebaseCollectionContext.
          It must be a "use client" component.
        */}
        {/*
            Global UI components that appear on every page
        */}
        <AppProviders>
          {children}
          <ShareButton />
        </AppProviders>
      </body>
    </html>
  );
}

export default RootLayout;
