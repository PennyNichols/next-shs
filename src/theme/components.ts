// src/theme/components.ts
import { alpha } from '@mui/material/styles';
// Import the necessary types from Material-UI for type safety
import { Components, Theme } from '@mui/material/styles';
import { CSSObject } from '@emotion/react'; // For explicit return type of style overrides
import { customShadows, customBorderRadius, customTransitions } from './otherThemeConstants'; // Assuming these are correctly typed as discussed

// Explicitly type the 'components' object as Material-UI's Components type
const components: Components<Omit<Theme, 'components'>> = {
  // Use Omit to prevent circular type reference
  // ---------------------------------------------------
  // Global Scrollbar Customizations (Added here)
  // ---------------------------------------------------
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      // For Webkit-based browsers (Chrome, Safari, Edge, etc.)
      body: {
        // scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`, // Firefox specific
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: 10, // Width of the vertical scrollbar
          height: 10, // Height of the horizontal scrollbar
          backgroundColor: 'transparent', // Track background
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7), // Thumb color
          borderRadius: customBorderRadius.pill, // Rounded corners for the thumb
          border: `none`, // Space around the thumb
          '&:hover': {
            backgroundColor: theme.palette.primary.main, // Thumb color on hover
          },
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2), // Track background
          borderRadius: 0,
        },
        '&::-webkit-scrollbar-button, & *::-webkit-scrollbar-button': {
          height: 0,
          width: 0,
          // '&:hover': {
          //   backgroundColor: theme.palette.primary.main,
          // },
        },
        // For Firefox (optional, but good for completeness)
        // Note: Firefox scrollbar styling is limited compared to Webkit
        // This targets the default scrollbars
        '@supports not selector(::-webkit-scrollbar)': {
          scrollbarWidth: 'auto',
          scrollbarColor: `${alpha(theme.palette.primary.main, 0.5)} ${theme.palette.background.paper}`,
        },
      },
      // You can also target specific elements or globally within a container if needed
      // For example, if you have a common container class for scrollable content:
      // '.scrollable-container': {
      //   '&::-webkit-scrollbar': { /* ... */ },
      //   '&::-webkit-scrollbar-thumb': { /* ... */ },
      // },
    }),
  },
  // MuiButton Component Customizations
  // ---------------------------------------------------
  MuiButton: {
    // defaultProps: { ... }, // Keep this section if you use it

    styleOverrides: {
      // Targets the root element of the Button component
      // Explicitly type the return value of the function to CSSObject
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: customShadows[2], // Access directly from import
        borderRadius: customBorderRadius.small, // Access directly from import
        border: `2px solid transparent`,
        transition: customTransitions.standard, // Access directly from import
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minWidth: 'auto',
      }),
      // Apply explicit typing to other style overrides as well for consistency
      containedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }),
      outlinedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      }),
      outlinedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.04),
        },
      }),
      // ... (other commented-out styleOverrides can be left as is,
      //      but if you uncomment and use them, they should also have the
      //      CSSObject return type for consistency)
    },
  },
  // ---------------------------------------------------
  // MuiDialog Component Customizations
  // ---------------------------------------------------
  MuiDialog: {
    // defaultProps: { ... },
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }): CSSObject => ({
        background: theme.palette.background.default,
        borderRadius: customBorderRadius.medium,
        boxShadow: customShadows[3],
        padding: theme.spacing(2),
        minHeight: '30vh',
      }),
    },
  },
  // ---------------------------------------------------
  // MuiDialogTitle Component Customizations
  // ---------------------------------------------------
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
      }),
    },
  },
  // ---------------------------------------------------
  // MuiDialogContent Component Customizations
  // ---------------------------------------------------
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.text.primary,
        fontSize: '1rem',
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }),
    },
  },
  // ---------------------------------------------------
  // MuiSkeleton Component Customizations
  // ---------------------------------------------------
  MuiSkeleton: {
    // defaultProps: { ... },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
        '&::after': {
          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.secondary.dark, 0.1)}, transparent)`,
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiTextField Component Customizations
  // ---------------------------------------------------
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // You can control consistent spacing around the TextField here if needed.
        // For example, if you want a consistent bottom margin for all text fields:
        // marginBottom: theme.spacing(2),
      }),
    },
  },
  // ---------------------------------------------------
  // MuiOutlinedInput Component Customizations
  // ---------------------------------------------------
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.small,
        backgroundColor: 'transparent',
        transition: theme.transitions.create(['box-shadow']),
        '&.Mui-focused': {
          boxShadow: theme.shadows[1],
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light, // focused border color
            borderWidth: '1px',
          },
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light,
        },
        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
        },
        '&.Mui-disabled': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.3),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.secondary.dark, 0.5),
          },
        },
      }),
      notchedOutline: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.secondary.dark,
        borderWidth: '1px',
        transition: theme.transitions.create(['border-color'], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
        '&.Mui-focused:not(:hover)': {},
      }),
      input: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        '&::placeholder': {
          color: alpha(theme.palette.secondary.dark, 0.7),
          opacity: 1,
        },
        '.Mui-focused &': {
          color: theme.palette.primary.light, // Change input text color on focus
        },
        // Hide controls entirely (common practice for design consistency)
        '&[type="number"]': {
          '-moz-appearance': 'textfield',
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiInputLabel Component Customizations
  // ---------------------------------------------------
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '0.95rem',
        fontWeight: 400,
        '&.Mui-focused': {
          fontSize: '0.95rem',
          color: theme.palette.primary.light,
          fontWeight: 400,
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      }),
      outlined: ({ theme }: { theme: Theme }): CSSObject => ({
        transform: 'translate(14px, 8.5px) scale(1)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(15px, -8px) scale(0.75)',
        },
      }),
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Styles applied to the root element.
        color: theme.palette.text.secondary, // Default color for adornments
        // fontSize: '0.125rem',
        // When the parent InputBase is focused
        // The InputBase has a class .Mui-focused when it's focused.
        // We need to target the adornment when its parent has this class.
        '.MuiInputBase-root.Mui-focused &': {
          // Target .MuiInputBase-root (the parent) when focused
          color: theme.palette.primary.light, // Change adornment color on focus
        },

        // When the parent InputBase is hovered
        // The InputBase has a class .Mui-hovered (though it might be .Mui-focused for some TextField variants)
        // or you can target the direct hover state of InputBase.
        '.MuiInputBase-root:hover &': {
          // Target .MuiInputBase-root (the parent) on hover
          color: theme.palette.primary.light, // Change adornment color on hover
        },

        // Ensure icons inherit the color
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem', // Or whatever size you desire
          // It's crucial for icons to inherit the color from their parent adornment
          color: 'inherit',
        },
        '&.MuiInputAdornment-positionStart': {
          marginRight: 0, // Example: Spacing for start adornments
          marginLeft: theme.spacing(-1),
          '& .MuiSvgIcon-root': {
            fontSize: '1.3rem', // Example: set a specific pixel size
            // Or use theme values:
            // fontSize: theme.typography.pxToRem(20),
          },
        },
        '&.MuiInputAdornment-positionEnd': {
          marginLeft: theme.spacing(1), // Example: Spacing for end adornments
        },
        // You can also target specific variants if needed
        // e.g., for Outlined Input adornments
        '&.MuiInputAdornment-outlined': {
          // Specific styles for outlined variant adornments
        },
        '&.Mui-focus': {
          color: theme.palette.primary.light,
        },
        '&.Mui-error': {
          color: theme.palette.error.main, // Adornment color when TextField is in error state
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled, // Adornment color when TextField is disabled
        },
      }),
      // You can also target specific variants or positions directly
      // positionStart: {
      //   // Styles specific to start adornments
      // },
      // positionEnd: {
      //   // Styles specific to end adornments
      // },
      // filled: {
      //   // Styles specific to filled variant adornments
      // },
      // outlined: {
      //   // Styles specific to outlined variant adornments
      // },
      // standard: {
      //   // Styles specific to standard variant adornments
      // },
    },
  },
  // *** End of MuiInputAdornment style overrides ***
  // ---------------------------------------------------
  // MuiInputBase Component Customizations
  // ---------------------------------------------------
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }: { theme: Theme }): CSSObject => ({}),
    },
  },
  // ---------------------------------------------------
  // MuiFormHelperText Component Customizations
  // ---------------------------------------------------
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        textAlign: 'right',
        marginTop: -11,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1,
        width: 'fit-content',
        padding: theme.spacing(0, 0.5),
        alignSelf: 'flex-end',
        fontSize: '0.7rem',
        // When the parent FormControl is focused
        // The FormControl-root gets the Mui-focused class when the TextField inside is focused.
        '&.Mui-focused': {
          color: `${theme.palette.primary.light} !important`, // Change helper text color on focus
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiSelect Component Customizations
  // ---------------------------------------------------
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Base styles for the select root
      }),
      select: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        borderRadius: customBorderRadius.small,
        backgroundColor: 'transparent',
        '&:focus': {
          borderRadius: customBorderRadius.small,
          backgroundColor: 'transparent',
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          backgroundColor: alpha(theme.palette.secondary.main, 0.3),
        },
      }),
      outlined: ({ theme }: { theme: Theme }): CSSObject => ({
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light,
          borderWidth: '1px',
        },
      }),
      icon: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        transition: theme.transitions.create(['color', 'transform'], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
        '.MuiSelect-select:hover ~ &': {
          color: theme.palette.primary.light,
        },
        '.Mui-focused &': {
          color: theme.palette.primary.light,
          transform: 'rotate(180deg)',
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiMenuItem Component Customizations
  // ---------------------------------------------------
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '0.95rem',
        padding: theme.spacing(1, 2),
        minHeight: 'auto',
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.08),
          color: theme.palette.primary.main,
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.light, 0.12),
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.16),
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: alpha(theme.palette.primary.light, 0.08),
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiMenu Component Customizations
  // ---------------------------------------------------
  MuiMenu: {
    defaultProps: {
      disableScrollLock: true,

    },
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.small,
        boxShadow: customShadows[2],
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.secondary.dark, 0.12)}`,
        marginTop: theme.spacing(0.5),
        minWidth: 120,
        '& .MuiMenu-list': {
          padding: theme.spacing(0.5, 0),
        },
      }),
      list: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(0.5, 0),
      }),
    },
  },
  // ---------------------------------------------------
  // MuiPopover Component Customizations (used by Select dropdown)
  // ---------------------------------------------------
  MuiPopover: {
    // defaultProps: {
    //   disableScrollLock: true,
    // },
    styleOverrides: {
      paper: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.small,
        boxShadow: customShadows[2],
        border: `1px solid ${alpha(theme.palette.secondary.dark, 0.12)}`,
        '&.MuiMenu-paper': {
          // Specific styles when used as a Menu (Select dropdown)
          marginTop: theme.spacing(0.5),
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormControl Component Customizations
  // ---------------------------------------------------
  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Base styles for form control
        '& .MuiInputLabel-root': {
          // Ensure label positioning for Select components
          '&.MuiInputLabel-outlined': {
            transform: 'translate(14px, 8.5px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(15px, -8px) scale(0.75)',
            },
          },
        },
      }),
    },
  },
  // Add other component overrides as needed here in the future
  // MuiCard: {
  //   styleOverrides: {
  //     root: ({ theme }: { theme: Theme }): CSSObject => ({
  //       borderRadius: customBorderRadius.medium,
  //       boxShadow: customShadows[2],
  //       backgroundColor: theme.palette.background.default,
  //     }),
  //   },
  // },
  // MuiAppBar: {
  //   styleOverrides: {
  //     root: ({ theme }: { theme: Theme }): CSSObject => ({
  //       backgroundColor: theme.palette.primary.main,
  //       boxShadow: customShadows[1],
  //     }),
  //   },
  // },
};

export default components;
