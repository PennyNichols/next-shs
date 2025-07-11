import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import type { Metadata } from 'next';

import { AppProviders } from './providers';

import NavBar from '@/components/layout/NavBar/NavBar';
import Footer from '@/components/layout/Footer/Footer';
import { ShareButton } from '@/components/action-buttons';

export const metadata: Metadata = {
  title: 'SHS Site 2024',
  description: 'Your site description',
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
  themeColor: '#00112c',
  icons: {
    icon: '/favicon.ico',
    // You can also add apple: '/apple-touch-icon.png' etc.
  },
  // Add other global metadata here (e.g., openGraph, twitter, etc.)
  // See: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

export default function RootLayout({
  children, // This represents the content of your pages (e.g., app/page.jsx, app/about/page.jsx)
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/*
          AppProviders wrap entire application content.
          It handles Emotion/MUI Theme, AuthContext, and FirebaseCollectionContext.
          It must be a "use client" component.
        */}
        {/*
            Global UI components that appear on every page
        */}
        <div style={{ flexGrow: 1, minWidth: '100%', overflowX: 'hidden' }}>
          <AppProviders>
            {children}
            <ShareButton />
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
