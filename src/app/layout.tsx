// src/app/layout.tsx
// This file replaces the functionality of _document.js and part of _app.js in the App Router.

// 1. Global CSS Imports (from _app.js)
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 2. React, Next.js Metadata Type
import React from 'react';
import type { Metadata } from 'next';

// 3. Import your client-side Providers wrapper (new file)
import { AppProviders } from './providers'; // We will create this file below

// 4. Import global UI components (assuming they are Server Components or marked with "use client" internally)
// If NavBar and Footer don't need "use client", they can be directly rendered here.
// If they do, they'll need "use client" at their own file top.
import NavBar from '@/components/layout/NavBar/NavBar'; // Adjust path if moved
import Footer from '@/components/layout/Footer/Footer'; // Adjust path if moved
import { ShareButton } from '@/components/action-buttons';

// 5. Global Metadata (from _app.js <Head> and _document.js <meta>)
export const metadata: Metadata = {
  title: 'SHS Site 2024', // From _app.js
  description: 'Your site description', // Add a descriptive one for your app
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width', // From _app.js
  themeColor: '#00112c', // From _document.js (using your primary color from palette.js)
  icons: {
    icon: '/favicon.ico', // From _document.js
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
    // Html and Body structure (from _document.js)
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/*
          AppProviders will wrap your entire application content.
          It handles Emotion/MUI Theme, AuthContext, and FirebaseCollectionContext.
          It must be a "use client" component.
        */}
        {/*
            Global UI components that appear on every page,
            like your NavBar and Footer, are placed here.
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
