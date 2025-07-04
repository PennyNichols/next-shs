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
import theme from '@/theme';
import globalSlickStyles from '../src/theme/globalSlickStyles';

// Your Custom Components/Providers
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import ShareButton from '../components/ActionButtons/ShareButton';
import ComingSoon from '../components/ComingSoon/ComingSoon';
import { FirebaseCollectionProvider } from '../hooks/FirebaseService';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const disabledPaths = ['/blog', '/about', '/FAQ', '/auth'];
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
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  );
}

export default MyApp;
