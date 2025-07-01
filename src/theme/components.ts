// src/theme/components.ts
import { alpha } from '@mui/material/styles';
import { Components, Theme } from '@mui/material/styles';
import { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from './otherThemeConstants'; // Assuming these are correctly typed as discussed
import { lightGray } from './colors';

const svgDropShadowFilter = `%3Cdefs%3E%3Cfilter id='shadow' x='-70%25' y='-70%25' width='300%25' height='300%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='1' flood-color='%23000' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E`;

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
          // Default arrows are not visible, use background-image for custom arrows:
          '-webkit-appearance': 'none',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
        },

        // Vertical scrollbar buttons
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
      form: {},
    }),
  },
  // ---------------------------------------------------
  // MuiPaper Component Customizations
  // ---------------------------------------------------
  MuiPaper: {
    defaultProps: {
      elevation: 3,
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.slight,
        background: theme.palette.background.paper,
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormLabel Component Customizations (for the main question label)
  // ---------------------------------------------------
  MuiGrid: {
    defaultProps: {
      item: true,
      // If you set container: true here, all Grid components would be containers unless specified otherwise
      // container: true, // Not recommended to make ALL grids containers by default
      // spacing: 2,      // Not recommended to make ALL grids have spacing 2 by default
    },
    styleOverrides: {
      // This is where you put CSS for the .MuiGrid-root class
      root: ({ theme, ownerState }) => ({
        // CSS that applies to the root element of a Grid
        // You can even target it when it's a form if you want specific styles
        // if (ownerState.component === 'form') { ... }
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormLabel Component Customizations (for the main question label)
  // ---------------------------------------------------
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '1rem',
        [theme.breakpoints.down('md')]: {
          fontSize: '0.875rem',
        },
        '&.Mui-focused': {
          color: theme.palette.primary.light,
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
        '&.Mui-required .MuiFormLabel-asterisk': {
          color: theme.palette.primary.light,
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
      }),
    },
  },
  // ---------------------------------------------------
  // MuiRadio Component Customizations (the actual radio button circle)
  // ---------------------------------------------------
  MuiRadio: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        width: 30,
        height: 30,
        marginRight: theme.spacing(0.5),
        padding: theme.spacing(1),
        transition: theme.transitions.create(['color']),
        '&:hover': {
          color: theme.palette.primary.light,
        },
        '&.Mui-checked': {
          color: theme.palette.secondary.dark,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
          },
        },
        '&:not(.Mui-checked):hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
        },
        '&.Mui-disabled': {
          color: alpha(theme.palette.secondary.dark, 0.5),
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem',
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiCheckbox Component Customizations
  // ---------------------------------------------------
  MuiCheckbox: {
    defaultProps: {
      size: 'small', // Matches the default size of MuiRadio
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // color: theme.palette.secondary.dark, // Default color for unchecked state
        // width: 30, // Matches width of MuiRadio
        // height: 30, // Matches height of MuiRadio
        // marginRight: theme.spacing(0.5), // Matches margin of MuiRadio
        // padding: theme.spacing(1), // Matches padding of MuiRadio
        // transition: theme.transitions.create(['color']), // Smooth color transition
        // // Hover effect for unchecked checkbox
        // '&:hover': {
        //   color: theme.palette.primary.light, // Hover color for unchecked
        // },
        // // Styles when checkbox is checked
        // '&.Mui-checked': {
        //   color: theme.palette.primary.light, // Color when checked
        //   // Hover effect for checked checkbox
        //   '&:hover': {
        //     backgroundColor: alpha(theme.palette.primary.light, 0.1), // Background hover for checked
        //   },
        // },
        // // Hover effect for unchecked checkbox (explicitly for when not checked)
        // '&:not(.Mui-checked):hover': {
        //   backgroundColor: alpha(theme.palette.primary.light, 0.1), // Background hover for unchecked
        // },
        // // Styles when checkbox is disabled
        // '&.Mui-disabled': {
        //   color: alpha(theme.palette.secondary.dark, 0.5), // Disabled color
        // },
        // // Icon size
        // '& .MuiSvgIcon-root': {
        //   fontSize: '1.25rem', // Matches icon size of MuiRadio
        // },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormControlLabel Component Customizations (wraps Radio and its label text)
  // ---------------------------------------------------
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
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
        '&:hover .MuiCheckbox-icon': {
          borderColor: theme.palette.primary.light,
        },
      }),
      label: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '1rem',
        [theme.breakpoints.down('md')]: {
          fontSize: '0.875rem',
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      }),
    },
  },
  //----------------------------------------------------
  // MuiButton Component Customizations
  // ---------------------------------------------------
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      color: 'primary',
    }, // Keep this section, might want to use it
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.07rem',
        boxShadow: customShadows[2],
        borderRadius: customBorderRadius.small,
        border: `2px solid transparent`,
        transition: customTransitions.standard,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minWidth: 'auto',
        flexGrow: 1,
        '&:hover': {
          boxShadow: customShadows[2],
          letterSpacing: '0.1rem',
        },
      }),
      containedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
        '&:hover': {
          color: theme.palette.accent.main,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.accent.main,
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.accent.main,
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.accent.main,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.accent.main,
        },
      }),
      outlinedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          color: theme.palette.accent.main,
          border: `2px solid ${theme.palette.accent.main}`,
          backgroundColor: theme.palette.background.paper,
        },
      }),
      outlinedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.04),
        },
      }),
    },
  },
  MuiIconButton: {
    defaultProps: {
      // You can set default props here if needed, e.g., default color
      color: 'inherit', // Default color to inherit from parent, common for icon buttons
      size: 'medium', // Default size for consistency
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Base styles for all IconButtons
        transition: customTransitions.standard, // Apply your custom transition
        borderRadius: customBorderRadius.small, // Inherit button's border radius for consistency
        padding: theme.spacing(1), // Standard padding for icon buttons
        '&:hover': {
          // Default hover effect for icon buttons
          transform: 'scale(1.2)', // Slightly scale up on hover
          // backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        },
        '&.Mui-disabled': {
          // Disabled state for icon buttons
          color: theme.palette.action.disabled,
          cursor: 'not-allowed',
        },
      }),
      // Style overrides based on 'color' prop (e.g., color="primary")
      colorPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
      }),
      colorSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
        },
      }),
      colorError: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.error.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.error.main, theme.palette.action.hoverOpacity),
        },
      }),
      colorInfo: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.info.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.info.main, theme.palette.action.hoverOpacity),
        },
      }),
      colorSuccess: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.success.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.success.main, theme.palette.action.hoverOpacity),
        },
      }),
      colorWarning: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.warning.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.warning.main, theme.palette.action.hoverOpacity),
        },
      }),
      // Style overrides based on 'size' prop
      sizeSmall: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(0.5), // Smaller padding for small size
        fontSize: '1.125rem', // Default icon font size for small is 18px (adjust as needed)
      }),
      sizeMedium: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1), // Default padding for medium size
        fontSize: '1.5rem', // Default icon font size for medium is 24px (adjust as needed)
      }),
      sizeLarge: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1.5), // Larger padding for large size
        fontSize: '2rem', // Default icon font size for large is 32px (adjust as needed)
      }),
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        marginBottom: theme.spacing(1.5),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        '& .MuiIconButton-root': {
          color: theme.palette.primary.contrastText,
          '&:hover': {
            color: theme.palette.accent.main,
          },
        },
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
        overflowX: 'hidden',

        // alignItems: 'center',   !!!! DO NOT USE ALIGN ITEMS !!!!!
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
        // Hide number controls entirely
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
    },
  },
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
        '&:hover .MuiOutlinedInput-notchedOutline, &:hover .MuiSvgIcon-root': {
          borderColor: theme.palette.primary.light,
          color: theme.palette.primary.light,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light,
          borderWidth: '1px',
        },
      }),
      icon: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fill: theme.palette.secondary.dark,
        transition: customTransitions.fast,
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
        padding: theme.spacing(0.5, 2, 1, 2),
        alignItems: 'flex-start',
        minHeight: 'auto',
        transition: customTransitions.fast,
        '& .MuiCheckbox-root': {
          transition: customTransitions.fast,
          color: theme.palette.secondary.dark,
          top: -5,
          left: -1,
        },
        '& .Mui-checked .MuiSvgIcon-root': {
          color: theme.palette.secondary.dark,
          transition: customTransitions.fast,
        },
        '& .PrivateSwitchBase-input': {
          width: 36,
          height: 36,
        },
        '& .MuiTypography-root': {
          paddingTop: theme.spacing(0.45),
          transition: customTransitions.fast,
        },

        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.light, 0.03),
          color: theme.palette.primary.light,
          '& .MuiCheckbox-root, .MuiTypography-root, & .Mui-checked .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
          },
          '& .checkbox-container': {
            borderColor: theme.palette.primary.light,
          },
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.light, 0.03),
          color: theme.palette.secondary.dark,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.06),
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: alpha(theme.palette.primary.light, 0.03),
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
        '&.MuiList-root': {
          boxShadow: 'none',
        },
        '&.MuiSelect-dropdown-paper': {
          borderRadius: customBorderRadius.none,
          boxShadow: customShadows[4],
          backgroundColor: theme.palette.background.paper,
          outline: `8px solid ${theme.palette.background.paper}`,
          outlineOffset: -1,
          padding: theme.spacing(0, 1),
          borderTop: `10px solid ${theme.palette.background.paper}`,
          borderBottom: `10px solid ${theme.palette.background.paper}`,
          borderLeft: `5px solid ${theme.palette.background.paper}`,
          borderRight: `8px solid ${theme.palette.background.paper}`,
          minHeight: '40vh',
          maxHeight: '70vh',
          minWidth: 120,
          maxWidth: 450,
          '&.MuiSelect-dropdown-headers': {
            '& .MuiListSubheader-root': {
              backgroundColor: theme.palette.primary.main,
              padding: theme.spacing(1, 2),
              marginBottom: theme.spacing(1.5),
              '& .MuiTypography-root': {
                color: theme.palette.primary.contrastText,
                fontSize: '1.3rem',
                fontWeight: 600,
              },
            },
            '&::-webkit-scrollbar-track': {
              marginTop: theme.spacing(7),
            },
          },
        },
        '& .MuiMenu-list': {
          padding: theme.spacing(0),
          boxShadow: 'none',
        },
      }),
      list: ({ theme }: { theme: Theme }): CSSObject => ({
        margin: theme.spacing(0, 0),
      }),
    },
  },
  // ---------------------------------------------------
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
      }),
    },
  },
  // ---------------------------------------------------
  // MuiFormControl Component Customizations
  // ---------------------------------------------------
  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
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
