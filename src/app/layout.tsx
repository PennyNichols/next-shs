// This file sets up global providers and styles for pages within the 'app/' directory.
'use client'; 

// Global CSS Imports
import './globals.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 

// Next.js Font Optimization
import { Inter } from 'next/font/google';

// React (implicitly used by JSX)
import React from 'react';

// Material-UI Imports
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material'; 

// Your Custom Theme and Global Styles for react-slick
import theme from '../theme'
import globalSlickStyles from '../theme/globalSlickStyles';

import EmotionRegistry from './EmotionRegistry';


const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: "Schmidt's Home Services",
  description:
    // eslint-disable-next-line max-len
    "Experienced handyman and construction professionals serving Florida's Port Charlotte / Punta Gorda / North Port / Englewood. We offer reliable service and quality workmanship for all your home improvement projects. Contact us today!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('App Router - Theme Debug: Type of theme:', typeof theme);
  console.log('App Router - Theme Debug: Is theme a plain object:', Object.prototype.toString.call(theme));
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <EmotionRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalSlickStyles} />
            {children}
          </ThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
