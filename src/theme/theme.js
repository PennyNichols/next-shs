import { alpha, createTheme } from '@mui/material/styles';

const navyBlue = 'rgb(0, 31, 63)';
const coolGray = 'rgb(209, 209, 217)';
const gold = 'rgb(255, 204, 0)';
const offWhite = 'rgb(237, 235, 243)';
const darkGray = 'rgb(51, 51, 52)';
const darkText = 'rgb(20, 19, 19)';

// MUI expects an array of 25 box-shadow strings (for elevations 0-24)
const customShadows = [
  'none',
  '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
  '0 2px 12px 0 rgba(0,0,0,0.2)',
  '0 4px 24px 0 rgba(0,0,0,0.3)',
  '0 6px 36px 0 rgba(0,0,0,0.4)',
  '0 8px 48px 0 rgba(0,0,0,0.5)',
  '0 10px 56px 0 rgba(0,0,0,0.6)',
  // Fill the rest with 'none' or repeat as needed
  ...Array(18).fill('none'),
];

const customBorderRadius = {
  none: 0, // No rounding
  slight: 2, // Very subtle roundness, barely noticeable
  small: 4, // Standard for small elements like buttons
  medium: 8, // Good for cards or larger interactive elements
  large: 16, // More pronounced roundness, softer look
  extraLarge: 32, // Highly rounded, almost bubbly
  pill: 9999, // Completely rounded ends for horizontal elements
  circle: '50%', // Perfect circle for square elements
};

const theme = createTheme({
  palette: {
    primary: {
      main: navyBlue,
      light: 'rgb(51, 82, 114)', // Adjusted light shade
      dark: 'rgb(0, 22, 46)', // Adjusted dark shade
      contrastText: offWhite,
    },
    secondary: {
      main: coolGray,
      light: offWhite, // Adjusted light shade
      dark: 'rgb(156, 156, 161)', // Adjusted dark shade
      contrastText: navyBlue,
    },
    accent: {
      main: gold,
      light: 'rgb(255, 228, 102)', // Adjusted light shade
      dark: 'rgb(204, 172, 0)', // Adjusted dark shade
      contrastText: darkText,
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
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8,
  shadows: customShadows,
  shape: {
    borderRadius: customBorderRadius,
  },
  transitions: {
    slow: 'all 1s ease-in-out',
    standard: 'all 0.5s ease-in-out',
    fast: 'all 0.2s ease-in-out',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: customShadows[2],
          borderRadius: customBorderRadius.small,
          border: `2px solid transparent`,
          transition: 'all 0.5s ease-in-out',
          cursor: 'pointer',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: offWhite,
          borderRadius: customBorderRadius.medium,
          boxShadow: customShadows[3],
          padding: 16,
          minHeight: '30vh',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: navyBlue,
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: darkText,
          fontSize: 16,
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    // ...add other component overrides as needed...
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      color: darkText,
      marginBottom: '1rem',
      letterSpacing: 2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: navyBlue,
      letterSpacing: 0.5,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: navyBlue,
      letterSpacing: 0.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: navyBlue,
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
      color: navyBlue,
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
      boxShadow: customShadows[3],
      borderRadius: customBorderRadius.medium,
    },
  },
});

export default theme;
