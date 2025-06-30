//
// Fix autofill style in textboxes. when hovering the autofill options, the styles change.
//

// src/theme/components.ts
import { alpha } from '@mui/material/styles';
import { Components, Theme } from '@mui/material/styles';
import { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from './otherThemeConstants'; // Assuming these are correctly typed as discussed
import { lightGray } from './colors';

const svgDropShadowFilter = `%3Cdefs%3E%3Cfilter id='shadow' x='-70%25' y='-70%25' width='300%25' height='300%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='1' flood-color='%23000' flood-opacity='.5'/%3E%3C/filter%3E%3C/defs%3E`;

const components: Components<Omit<Theme, 'components'>> = {
  // ---------------------------------------------------
  // Global Scrollbar Customizations
  // ---------------------------------------------------
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      html: {
        scrollbarGutter: 'stable',
      },
      // For Webkit-based browsers (Chrome, Safari, Edge, etc.)
      body: {
        '&::-webkit-scrollbar': {
          width: 13,
          height: 13,
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
          borderRadius: customBorderRadius.pill,
          border: `2px solid ${theme.palette.secondary.main}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.secondary.main,
        },
        '&::-webkit-scrollbar-button': {
          backgroundColor: theme.palette.secondary.main,
          height: 13,
          width: 13,
          transition: 'background-image 2s ease-in-out',
          // Default arrows are not visible, use background-image for custom arrows:
          '-webkit-appearance': 'none',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
        },

        // Specific arrow icons for vertical scrollbar buttons
        '&::-webkit-scrollbar-button:vertical:start': {
          // Solid Rounded Up Triangle
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:vertical:end': {
          // Solid Rounded Down Triangle (rotated from up)
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(180 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(180 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:horizontal:start': {
          // Solid Rounded Left Triangle (rotated from up)
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(-90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(-90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:horizontal:end': {
          // Solid Rounded Right Triangle (rotated from up)
          'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '@supports not selector(::-webkit-scrollbar)': {
          scrollbarWidth: 'auto',
          scrollbarColor: `${alpha(theme.palette.primary.main, 0.5)} ${theme.palette.background.paper}`,
        },
        // This targets the default scrollbars within scrollable elements
        '& *::-webkit-scrollbar': {
          width: 15,
          height: 15,
          backgroundColor: 'transparent',
          borderRadius: customBorderRadius.pill,
        },
        '& *::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
          borderRadius: customBorderRadius.pill,
          border: `4px solid ${lightGray}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '& *::-webkit-scrollbar-track': {
          margin: theme.spacing(0, 1),
          backgroundColor: lightGray,
          borderRadius: customBorderRadius.pill,
        },
        '& *::-webkit-scrollbar-button': {
          height: 0,
          width: 0,
        },
      },
      // Autofill styles for input elements
      'input:-webkit-autofill': {
        // Change the background color, keeping a subtle transition
        WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
        WebkitTextFillColor: `${theme.palette.secondary.dark} !important`, // Text color
        caretColor: `${theme.palette.secondary.dark} !important`, // Cursor color
        transition: 'background-color 5000s ease-in-out 0s', // Long transition to keep the color
      },
      'input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
        // Override hover/focus/active states for autofill
        WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
        WebkitTextFillColor: `${theme.palette.secondary.dark} !important`,
        caretColor: `${theme.palette.secondary.dark} !important`,
      },

      // You can also target specific elements or globally within a container if needed
      // For example, if you have a common container class for scrollable content:
      // '.scrollable-container': {
      //   '&::-webkit-scrollbar': { /* ... */ },
      //   '&::-webkit-scrollbar-thumb': { /* ... */ },
      // },
    }),
  },
  // ---------------------------------------------------
  // MuiFormLabel Component Customizations (for the main question label)
  // ---------------------------------------------------
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark, // Default label color
        fontSize: '1rem', // Default font size for larger screens
        [theme.breakpoints.down('md')]: {
          fontSize: '0.875rem', // Smaller font for 'xs' breakpoint
        },
        '&.Mui-focused': {
          color: theme.palette.primary.light, // Consistent with TextField labels on focus
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
        '&.Mui-required .MuiFormLabel-asterisk': {
          color: theme.palette.primary.light, // Asterisk color for required fields
        },
      }),
    },
  },

  // ---------------------------------------------------
  // MuiRadioGroup Component Customizations
  // ---------------------------------------------------
  MuiRadioGroup: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // The display, flexDirection, and gap are handled by the parent FormControl,
        // so generally minimal styles are needed directly on the RadioGroup root.
        // If you were *not* using FormControl's flex properties, you might add:
        // display: 'flex',
        // flexDirection: 'row',
        // gap: theme.spacing(2), // Spacing between individual FormControlLabel children
      }),
    },
  },

  // ---------------------------------------------------
  // MuiRadio Component Customizations (the actual radio button circle)
  // ---------------------------------------------------
  MuiRadio: {
    defaultProps: {
      size: 'small', // Set default size to 'small' as per your usage
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: 'theme.palette.secondary.dark', // Default (unchecked) color
        width: 30,
        height: 30,
        marginRight: theme.spacing(0.5), // Small left margin for spacing
        padding: theme.spacing(1), // Consistent padding for the control element
        transition: theme.transitions.create(['color']), // Smooth color transition
        '&:hover': {
          color: theme.palette.primary.light, // Hover color
        },
        '&.Mui-checked': {
          color: theme.palette.primary.light, // Checked color
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.1), // Hover background for checked state
          },
        },
        '&:not(.Mui-checked):hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.1), // Hover background for unchecked state
        },
        '&.Mui-disabled': {
          color: alpha(theme.palette.secondary.dark, 0.5), // Disabled icon color
        },
        // Adjust the size of the internal SVG icon if needed
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem', // Example: make the icon slightly smaller than default 'medium'
        },
      }),
    },
  },

  // ---------------------------------------------------
  // MuiFormControlLabel Component Customizations (wraps Radio and its label text)
  // ---------------------------------------------------
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Remove default margins if the parent `FormControl` is handling spacing with `gap`
        marginRight: theme.spacing(3),
        '&:first-of-type': {
          marginLeft: theme.spacing(1),
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed',
        },
        '&:hover .MuiRadio-root, &:hover .MuiTypography-root': {
          color: theme.palette.primary.light,
        },
      }),
      label: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark, // Default label text color
        fontSize: '1rem', // Default font size for label
        [theme.breakpoints.down('md')]: {
          fontSize: '0.875rem', // Responsive font size for 'xs' breakpoint
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled, // Disabled label text color
        },
      }),
      // You can also target specific parts if needed, e.g., to adjust spacing between control and label:
      // labelPlacementStart: {},
      // labelPlacementEnd: {},
      // control: { // Styles for the wrapper around the Radio component itself
      //   marginRight: theme.spacing(1), // Example: small gap between Radio and label text
      // },
    },
  },

  //----------------------------------------------------
  // MuiButton Component Customizations
  // ---------------------------------------------------
  MuiButton: {
    // defaultProps: { ... }, // Keep this section if you use it

    styleOverrides: {
      // Targets the root element of the Button component
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: customShadows[2],
        borderRadius: customBorderRadius.small,
        border: `2px solid transparent`,
        transition: customTransitions.standard,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minWidth: 'auto',
      }),
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
        margin: 0,
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
            borderColor: theme.palette.primary.light,
            borderWidth: '1.5px',
          },
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light,
          borderWidth: '1.5px',
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
          color: alpha(theme.palette.secondary.dark, 0.6),
          opacity: 1,
        },
        '.Mui-focused &': {
          color: theme.palette.primary.light,
        },
        // Hide number controls entirely (common practice for design consistency)
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
        color: theme.palette.text.secondary,
        '.MuiInputBase-root.Mui-focused &': {
          color: theme.palette.primary.light,
        },
        '.MuiInputBase-root:hover &': {
          color: theme.palette.primary.light,
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem',
          color: 'inherit',
        },
        '&.MuiInputAdornment-positionStart': {
          marginRight: 0,
          marginLeft: theme.spacing(-1),
          '& .MuiSvgIcon-root': {
            fontSize: '1.3rem',
          },
        },
        '&.MuiInputAdornment-positionEnd': {
          marginLeft: theme.spacing(1),
        },
        '&.MuiInputAdornment-outlined': {},
        '&.Mui-focus': {
          color: theme.palette.primary.light,
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
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
        '&.Mui-focused': {
          color: `${theme.palette.primary.light} !important`,
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
      root: ({ theme }: { theme: Theme }): CSSObject => ({}),
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
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        maxHeight: 400,
        marginTop: theme.spacing(0.5),
        overflowY: 'auto',
        overflowX: 'hidden',
        '&.MuiSelect-dropdown-paper': {
          borderRadius: customBorderRadius.none,
          boxShadow: customShadows[4],
          backgroundColor: theme.palette.background.paper,
          outline: `8px solid ${theme.palette.background.paper}`,
          padding: theme.spacing(0, 1),
          borderTop: `10px solid ${theme.palette.background.paper}`,
          borderBottom: `10px solid ${theme.palette.background.paper}`,
          borderLeft: 'none',
          borderRight: 'none',
          minWidth: 120,
          maxWidth: 450,
          '&.MuiSelect-dropdown-headers': {
            '&::-webkit-scrollbar-track': {
              marginTop: theme.spacing(5),
            },
          },
        },
        '& .MuiMenu-list': {
          padding: theme.spacing(0),
        },
      }),
      list: ({ theme }: { theme: Theme }): CSSObject => ({
        margin: theme.spacing(0, 0),
      }),
    },
  }, // ---------------------------------------------------
  // MuiListSubheader Component Customizations
  // ---------------------------------------------------
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Ensure the subheader has a distinct background so content doesn't show through
        backgroundColor: theme.palette.primary.main, // Potentially add some padding if needed, but MuiList-padding should handle overall spacing
        boxShadow: 'none',
        // padding: theme.spacing(1, 2),
        zIndex: 1, // Ensure it's above the list items
      }),
      sticky: ({ theme }: { theme: Theme }): CSSObject => ({
        // The default Material-UI sticky implementation should handle this,
        // but sometimes you might need to adjust top if there's other fixed elements
        // top: -10, // Adding a small bottom border can help visually separate it when sticky
        borderBottom: `1px solid ${theme.palette.divider}`,
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
        // '&.MuiMenu-paper': {
        //   backgroundColor: 'red',
        // },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormControl Component Customizations
  // ---------------------------------------------------
  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        '& .MuiFormLabel-root.Mui-focused ~ .MuiRadioGroup-root': {
          '& .MuiRadio-root.Mui-checked + .MuiTypography-root': {
            color: theme.palette.primary.light,
          },
        },
        '& .MuiInputLabel-root': {
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
