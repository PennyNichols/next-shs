import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(0, 31, 63)', // Navy Blue
        },
        secondary: {
            main: 'rgb(211, 211, 211)', // Warm Gray
        },
        accent: {
            main: 'rgb(255, 215, 0)', // Gold
        },
        background: {
            default: 'rgb(248, 248, 255)', // Off White Background
            paper: 'rgb(255, 255, 255)', // White paper background
        },
        text: {
            primary: 'rgb(51, 51, 51)', // Dark Gray or Black for text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
            color: 'rgb(20, 19, 19)',
            marginBottom: '1rem',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.3,
            color: 'rgb(0, 31, 63)',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: 1.4,
            color: 'rgb(0, 31, 63)',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'rgb(0, 31, 63)',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.6,
            color: 'rgb(69, 69, 69)',
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: 500,
            lineHeight: 1.7,
            color: 'rgb(0, 31, 63)',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'rgb(51, 51, 51)',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: 'rgb(51, 51, 51)',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
});

export default theme;