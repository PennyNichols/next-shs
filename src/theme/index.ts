import { createTheme, Shadows } from '@mui/material/styles';
import palette from './palette';
import { customShadows, customBorderRadius, customBreakpoints } from './otherThemeConstants';
import typography from './typography';
import components from './components';

export const navyBlue = 'rgb(0, 31, 63)';
export const coolGray = 'rgb(209, 209, 217)';
export const gold = 'rgb(255, 204, 0)';
export const white = 'rgb(255, 255, 255)';
export const offWhite = 'rgb(237, 235, 243)';
export const mediumGray = 'rgb(156, 156, 161)';
export const darkGray = 'rgb(51, 51, 52)';
export const darkText = 'rgb(20, 19, 19)';
export const errorRed = 'rgb(220, 20, 60)';
export const warningOrange = 'rgb(255, 165, 0)';
export const infoBlue = 'rgb(30, 144, 255)';
export const successGreen = 'rgb(60, 179, 113)';

const theme = createTheme({
  palette: palette,
  breakpoints: {
    values: customBreakpoints,
  },
  spacing: 8,
  shadows: customShadows as Shadows,
  shape: {
    borderRadius: customBorderRadius.small,
  },
  typography: typography,
  components: components,
});

export default theme;
