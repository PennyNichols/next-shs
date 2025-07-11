'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache/createEmotionCache';

import theme from '@/styles/theme';
import globalSlickStyles from '@/styles/theme/globalSlickStyles';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { FirebaseCollectionProvider } from '@/contexts/FirebaseCollectionContext/FirebaseCollectionContext';

import EmotionRegistry from './EmotionRegistry';
import NavBar from '@/components/layout/NavBar/NavBar';
import Footer from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/sections';
import { usePathname } from 'next/navigation';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const clientSideEmotionCache = React.useMemo(() => createEmotionCache(), []);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <EmotionRegistry>
      <AuthProvider>
        <FirebaseCollectionProvider>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            width="100%"
            sx={{ backgroundColor: theme.palette.secondary.light }}
          >
            {isHomePage && <Hero />}

            <NavBar />

            <Box
              flexGrow={1}
              sx={{
                paddingTop: 0,
                paddingBottom: 8,
              }}
            >
              {children}
            </Box>

            <Footer />
          </Box>
        </FirebaseCollectionProvider>
      </AuthProvider>
    </EmotionRegistry>
  );
}
