/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import '../src/app/globals.css';
import theme from '@/theme/theme';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import ShareButton from '../components/ActionButtons/ShareButton';
import { FirebaseCollectionProvider } from '../hooks/FirebaseService';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  return (
    <React.Fragment>
      <Head>
        <title>SHS Site 2024</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FirebaseCollectionProvider>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            sx={{ backgroundColor: theme.palette.secondary.light }}
          >
            {isHomePage && <Hero />}
            <NavBar />
            <Box flexGrow={1}>
              <Component {...pageProps} />
            </Box>
            <Footer />
            <ShareButton />
          </Box>
        </FirebaseCollectionProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
