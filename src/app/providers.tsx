'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Alert, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache/createEmotionCache';

import theme from '@/styles/theme';
import globalSlickStyles from '@/styles/theme/globalSlickStyles';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { FirebaseCollectionProvider } from '@/contexts/FirebaseCollectionContext/FirebaseCollectionContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { ImpersonationProvider, useImpersonation } from '@/contexts/ImpersonationContext';

import EmotionRegistry from './EmotionRegistry';
import NavBar from '@/components/layout/NavBar/NavBar';
import Footer from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/sections';
import { usePathname } from 'next/navigation';
import { AdminPanelSettings } from '@mui/icons-material';

// Component to handle impersonation alert inside the provider
const ImpersonationAlert = () => {
  const { isImpersonating, impersonatedUser, isHydrated } = useImpersonation();

  // Don't render during SSR to prevent hydration mismatch
  if (!isHydrated || !isImpersonating || !impersonatedUser) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      icon={<AdminPanelSettings />}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      You are acting on behalf of{' '}
      <strong>
        {impersonatedUser.firstName && impersonatedUser.lastName
          ? `${impersonatedUser.firstName} ${impersonatedUser.lastName}`
          : impersonatedUser.email}
      </strong>
    </Alert>
  );
};

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <EmotionRegistry>
      <AuthProvider>
        <FirebaseCollectionProvider>
          <AdminProvider>
            <ImpersonationProvider>
              <Box
                minHeight="100dvh"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  display: 'block',
                }}
              >
                {isHomePage && <Hero />}
                <NavBar />
                <ImpersonationAlert />
                <Box
                  sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    width: '100%',
                  }}
                >
                  {children}
                </Box>
                <Footer />
              </Box>
            </ImpersonationProvider>
          </AdminProvider>
        </FirebaseCollectionProvider>
      </AuthProvider>
    </EmotionRegistry>
  );
};
