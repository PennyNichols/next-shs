import { alpha } from '@mui/material/styles';

import {
  lightWhite,
  mediumWhite,
  darkWhite,
  lightGray,
  mediumGray,
  darkGray,
  lightBlue,
  mediumBlue,
  darkBlue,
  lightText,
  darkText,
  goldAccent,
  greenAccent,
  lightError,
  mediumError,
  darkError,
  warningOrange,
  infoBlue,
  successGreen,
} from './colors';

const palette = {
  // mode: 'light',

  primary: {
    main: mediumBlue,
    light: lightBlue,
    dark: darkBlue,
    contrastText: lightText,
  },
  secondary: {
    main: mediumGray,
    light: lightGray,
    dark: darkGray,
    contrastText: darkText,
  },
  accent: {
    primary: goldAccent,
    secondary: greenAccent,
    disabled: lightGray,
  },
  error: {
    main: mediumError,
    light: lightError,
    dark: darkError,
  },
  warning: {
    main: warningOrange,
  },
  info: {
    main: infoBlue,
  },
  success: {
    main: successGreen,
  },
  background: {
    default: mediumWhite,
    paper: lightWhite,
    dark: darkWhite,
  },
  text: {
    primary: darkText,
    secondary: lightText,
    disabled: lightGray,
  },
  action: {
    active: lightBlue,
    hover: alpha(lightBlue, 0.08),
    selected: alpha(lightBlue, 0.16),
    disabled: lightGray,
    disabledBackground: alpha(mediumGray, 0.12),
    focus: alpha(lightBlue, 0.24),
  },
  divider: mediumGray,
};

export default palette;
