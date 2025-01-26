import '../src/app/globals.css';
import NavBar from '../components/NavBar/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '@/theme/theme';
import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Head>
                <title>SHS Site 2024</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default MyApp;