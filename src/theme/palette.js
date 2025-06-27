// src/theme/palette.js
import { alpha } from '@mui/material/styles'; // Import alpha here if needed for transparency
import {
  navyBlue,
  coolGray,
  gold,
  white,
  offWhite,
  mediumGray,
  darkGray,
  darkText,
  errorRed,
  warningOrange,
  infoBlue,
  successGreen,
} from './colors'; // Adjust path if colors.js is elsewhere

const palette = {
  // mode: 'light', // You can define default mode here or in the main theme file

  primary: {
    main: navyBlue,
    light: 'rgb(51, 82, 114)',
    dark: 'rgb(0, 22, 46)',
    contrastText: offWhite,
  },
  secondary: {
    main: coolGray,
    light: offWhite,
    dark: mediumGray,
    contrastText: navyBlue,
  },
  accent: { // Custom palette color
    main: gold,
    light: 'rgb(255, 228, 102)',
    dark: 'rgb(204, 172, 0)',
    contrastText: darkText,
  },
  error: {
    main: errorRed,
    light: 'rgb(255, 69, 0)',
    dark: 'rgb(178, 34, 34)',
    contrastText: white,
  },
  warning: {
    main: warningOrange,
    light: 'rgb(255, 215, 0)',
    dark: 'rgb(204, 102, 0)',
    contrastText: darkText,
  },
  info: {
    main: infoBlue,
    light: 'rgb(100, 149, 237)',
    dark: 'rgb(25, 25, 112)',
    contrastText: white,
  },
  success: {
    main: successGreen,
    light: 'rgb(144, 238, 144)',
    dark: 'rgb(34, 139, 34)',
    contrastText: white,
  },
  background: {
    default: offWhite,
    paper: white,
  },
  text: {
    primary: darkGray,
    secondary: mediumGray,
    disabled: coolGray,
  },
  action: {
    active: darkGray,
    hover: alpha(navyBlue, 0.08),
    selected: alpha(navyBlue, 0.16),
    disabled: coolGray,
    disabledBackground: alpha(navyBlue, 0.12),
    focus: alpha(navyBlue, 0.24),
  },
  divider: mediumGray,
};

export default palette;