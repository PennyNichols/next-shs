// pages/_app.tsx
// This file is for pages within the 'pages/' directory.
// For pages in the 'app/' directory, refer to app/layout.tsx for global setup.

import '../src/app/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Material-UI Imports
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';

// Custom Theme and Global Styles
import theme from '@/styles/theme';
import globalSlickStyles from '../styles/theme/globalSlickStyles';

// Your Custom Components/Providers
import Footer from '../components/Footer/Footer';
import Hero from '../components/sections/Hero/Hero';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { FirebaseCollectionProvider } from '@/contexts/FirebaseCollectionContext/FirebaseCollectionContext';
import NavBar from '@/components/layout/NavBar/NavBar';
import { ShareButton } from '@/components/action-buttons';
import { ComingSoon } from '@/components/sections';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const disabledPaths = ['/blog', '/about', '/auth'];
  const clientSideEmotionCache = createEmotionCache();
  return (
    <React.Fragment>
      <Head>
        <title>SHS Site 2024</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalSlickStyles(theme)} />
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
                  {disabledPaths.includes(router.pathname) ? <ComingSoon /> : <Component {...pageProps} />}
                </Box>
                <Footer />
                <ShareButton />
              </Box>
            </FirebaseCollectionProvider>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  );
}

export default MyApp;
