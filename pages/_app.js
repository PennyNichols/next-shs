import '../src/app/globals.css';
import NavBar from '../components/NavBar/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;