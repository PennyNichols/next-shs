'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react'; // Alias to avoid confusion
import createCache from '@emotion/cache';

// This is a singleton cache that will be reused across client components
// within the same application lifecycle on the client side.
// It's important for performance and consistent style order.
let clientSideEmotionCache;

function getEmotionCache() {
  // We're using 'mui' as the key as per Material-UI's common practice.
  // `prepend: true` ensures Emotion's styles are inserted at the beginning
  // of the <head> to allow your custom styles to override them.
  const cache = createCache({ key: 'mui', prepend: true });
  // cache.compat = true; // Uncomment if you encounter compatibility issues with older Emotion/MUI usage.
  return cache;
}

export default function EmotionRegistry({ children }) {
  // Determine which cache to use:
  // On the server (during SSR), we create a fresh cache for each request.
  // On the client, we reuse the singleton `clientSideEmotionCache`.
  const emotionCache =
    typeof window === 'undefined'
      ? getEmotionCache() // Server-side: New cache per request
      : (clientSideEmotionCache = clientSideEmotionCache ?? getEmotionCache()); // Client-side: Singleton cache

  useServerInsertedHTML(() => {
    // After the server render, collect all the styles that Emotion inserted into this cache.
    const inserted = emotionCache.inserted;
    const names = Object.keys(inserted)
      .filter((name) => inserted[name] !== true) // Filter out keys that might just be markers
      .join(' ');
    const styles = Object.values(inserted)
      .filter((style) => typeof style === 'string') // Filter out non-CSS strings
      .join('');

    // Crucial for SSR: Flush the cache after collecting the styles.
    // This clears the collected styles so that the next server render starts with a clean slate,
    // preventing styles from previous requests from bleeding into new ones.
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

  return <DefaultCacheProvider value={emotionCache}>{children}</DefaultCacheProvider>;
}