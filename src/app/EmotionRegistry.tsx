'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@/styles/theme'; // <<-- IMPORTANT: Adjust this path if your theme is located elsewhere (e.g., '@/theme')
import createEmotionCache from '@/lib/createEmotionCache/createEmotionCache'; // <<-- IMPORTANT: This is your existing utility
import { GlobalStyles } from '@mui/material';
import globalSlickStyles from '@/styles/theme/globalSlickStyles';

// This is a singleton cache that will be reused across client components
// within the same application lifecycle on the client side.
// Important for performance and consistent style order.
let clientSideEmotionCache;

const getEmotionCacheSingleton = () => {
  return createEmotionCache();
}

const EmotionRegistry = ({ children }: { children: React.ReactNode }) => {
  // Determine which cache to use:
  // On the server (during SSR), we create a fresh cache for each request.
  // On the client, we reuse the singleton `clientSideEmotionCache`.
  const emotionCache =
    typeof window === 'undefined'
      ? getEmotionCacheSingleton() // Server-side: New cache per request
      : (clientSideEmotionCache = clientSideEmotionCache ?? getEmotionCacheSingleton()); // Client-side: Singleton cache

  useServerInsertedHTML(() => {
    // After the server render, collect all the styles that Emotion inserted into this cache.
    const inserted = emotionCache.inserted;
    const names = Object.keys(inserted)
      .filter((name) => inserted[name] !== true)
      .join(' ');
    const styles = Object.values(inserted)
      .filter((style) => typeof style === 'string')
      .join('');

    // Crucial for SSR: Flush the cache after collecting the styles.
    // This clears the styles so the next render starts with a clean slate,
    // Prevents styles in previous requests from bleeding into new ones.
    emotionCache.sheet.flush();

    return (
      <style
        data-emotion={`${emotionCache.key} ${names}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalSlickStyles(theme)} />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default EmotionRegistry;
