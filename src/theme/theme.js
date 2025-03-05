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
      dark: 'rgb(0, 22, 46)', // Adjusted dark shade
      contrastText: '#fff',
    },
    secondary: {
      main: warmGray,
      light: 'rgb(230, 230, 230)', // Adjusted light shade
      dark: 'rgb(180, 180, 180)', // Adjusted dark shade
      contrastText: navyBlue,
    },
    accent: {
      main: gold,
      light: 'rgb(255, 228, 102)', // Adjusted light shade
      dark: 'rgb(204, 172, 0)', // Adjusted dark shade
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
  breakpoints: {
    values: {
      xs: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
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
      letterSpacing: 0.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: 'rgb(0, 31, 63)',
      letterSpacing: 0.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: 'rgb(0, 31, 63)',
      letterSpacing: 0.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: 'rgb(0, 31, 63)',
      letterSpacing: 0.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      color: 'rgb(69, 69, 69)',
      letterSpacing: 0.2,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.7,
      color: 'rgb(0, 31, 63)',
      letterSpacing: 0.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'rgb(51, 51, 51)',
      letterSpacing: 0.2,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: 'rgb(51, 51, 51)',
      letterSpacing: 0.2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: 0.2,
    },
  },
});

export default theme;
