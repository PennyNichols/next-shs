import { createTheme } from '@mui/material/styles';

const navyBlue = 'rgb(0, 31, 63)';
const warmGray = 'rgb(211, 211, 211)';
const gold = 'rgb(255, 215, 0)';
const offWhite = 'rgb(248, 248, 255)';
const darkGray = 'rgb(51, 51, 51)';
const darkText = 'rgb(20, 19, 19)';

const theme = createTheme({
    palette: {
        primary: {
            main: navyBlue,
            light: 'rgb(51, 82, 114)', // Adjusted light shade
            dark: 'rgb(0, 22, 46)',  // Adjusted dark shade
            contrastText: '#fff',
        },
        secondary: {
            main: warmGray,
            light: 'rgb(230, 230, 230)', // Adjusted light shade
            dark: 'rgb(180, 180, 180)', // Adjusted dark shade
            contrastText: darkGray,
        },
        accent: {
            main: gold,
            light: 'rgb(255, 228, 102)', // Adjusted light shade
            dark: 'rgb(204, 172, 0)',   // Adjusted dark shade
            contrastText: 'rgb(0, 0, 0)',
        },
        background: {
            default: offWhite,
            paper: '#fff',
        },
        text: {
            primary: darkGray,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
                containedPrimary: {
                    backgroundColor: `${warmGray} !important`, // Warm gray background
                    color: navyBlue,          // Navy text
                    '&:hover': {
                        backgroundColor: 'rgb(190, 190, 190)', // Slightly darker gray on hover
                    },
                },
                outlinedPrimary: {
                    color: navyBlue,
                },
                textPrimary: {
                    color: navyBlue,
                },
                containedSecondary: {
                    color: darkGray,
                },
                outlinedSecondary: {
                    color: warmGray,
                },
                textSecondary: {
                    color: warmGray,
                },
                containedAccent: {
                    color: 'black',
                },
                outlinedAccent: {
                    color: gold,
                },
                textAccent: {
                    color: gold,
                },
            },
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