// src/theme/globalSlickStyles.ts (or .js)
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';

// Define your global styles as a function that takes the theme
const globalSlickStyles = (theme) => ({
  // --- Global Styles for react-slick Dots ---
  // Using @global to target classes created by react-slick, like 'slick-dots'
  '@global': {
    '.slick-dots': {
      padding: 0,
      margin: 0,
      listStyle: 'none', // Remove default list bullet points
      display: 'flex !important', // Ensure dots are displayed in a flex row
      justifyContent: 'center', // Center the dots horizontally
      alignItems: 'center', // Vertically align dots within their container

      '& li': {
        // Styles for each individual dot's list item (<li>)
        margin: theme.spacing(0, 0.5), // Add horizontal spacing between dots
        width: theme.spacing(1.5), // Set a consistent width for the clickable dot area
        height: theme.spacing(1.5), // Set a consistent height for the clickable dot area
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& button': {
          // Styles for the actual button element inside each <li>
          display: 'block', // Ensure the button takes up space
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          '&:focus': {
            outline: 'none', // Remove the default focus outline for a cleaner look
          },

          // --- Styling for the actual dot shape (the '•' character by default) ---
          '&::before': {
            fontFamily: 'slick', // Important: Ensures the default dot character is rendered correctly
            fontSize: theme.spacing(1), // Set the size of the dot character
            lineHeight: 1, // Align the dot vertically
            position: 'absolute', // Position the pseudo-element precisely
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            content: '"•"', // The default dot character. You could set this to ' ' if creating a custom shape.
            textAlign: 'center',
            opacity: 0.7, // Default opacity for inactive dots
            color: theme.palette.grey[500], // Default color for inactive dots
            // Improve text rendering for the dot character
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },

        // --- Styling for the active dot ---
        '&.slick-active button::before': {
          color: theme.palette.primary.main, // Set the active dot's color to your theme's primary color
          opacity: 1, // Make the active dot fully opaque
        },
      },
    },
    '.slick-arrow': {
      width: '20px',
      height: '20px',
      borderRadius: customBorderRadius.circle,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
    },
    '.slick-prev:before, .slick-next:before': {
      display: 'none',
    },
  },
});

export default globalSlickStyles;