import '../src/app/globals.css';
import NavBar from '../components/NavBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import ShareButton from '../components/ActionButtons/ShareButton';
import { Box } from '@mui/material';

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Head>
                <title>SHS Site 2024</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <NavBar />
                    <Box flexGrow={1}>
                        <Component {...pageProps} />
                    </Box>
                    <Footer />
                    <ShareButton />
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default MyApp;