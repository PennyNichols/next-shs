// src/theme/index.js
import { createTheme, Shadows } from '@mui/material/styles';

// Import your segmented theme parts
import palette from './palette';
import { customShadows, customBorderRadius, customBreakpoints } from './otherThemeConstants';
import typography from './typography';
import components from './components'; // <--- IMPORTANT: Import as a plain object, not a function to call

// Define all the constants that are also used in otherThemeConstants.js
// It's good practice to have them in a single place (like colors.js) and import them where needed.
// This block is already in your `index.js`, keeping it for completeness of the file.
export const navyBlue = 'rgb(0, 31, 63)';
export const coolGray = 'rgb(209, 209, 217)';
export const gold = 'rgb(255, 204, 0)';
export const white = 'rgb(255, 255, 255)';
export const offWhite = 'rgb(237, 235, 243)';
export const mediumGray = 'rgb(156, 156, 161)';
export const darkGray = 'rgb(51, 51, 52)';
export const darkText = 'rgb(20, 19, 19)';
export const errorRed = 'rgb(220, 20, 60)'; // Crimson
export const warningOrange = 'rgb(255, 165, 0)'; // Orange
export const infoBlue = 'rgb(30, 144, 255)'; // DodgerBlue
export const successGreen = 'rgb(60, 179, 113)'; // MediumSeaGreen


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
  // <--- IMPORTANT: Assign the imported 'components' object directly here.
  // createTheme will then iterate through it and pass the full 'theme' object
  // to your `({ theme }) => ({ ... })` style override functions.
  components: components,
});

export default theme;