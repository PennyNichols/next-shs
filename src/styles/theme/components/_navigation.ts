import { alpha } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from '../otherThemeConstants'; // Assuming these are correctly typed as discussed

const navComponents: Components<Theme> = {
  // ---------------------------------------------------
  // MuiLink Component Customizations
  // ---------------------------------------------------
  MuiLink: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        WebkitTapHighlightColor: 'transparent', // Prevents the default tap highlight color on links
        color: theme.palette.primary.light,
        textDecoration: 'none',
        transition: customTransitions.standard,
        '&:hover': {
          color: theme.palette.primary.main,
          textDecoration: 'underline',
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          cursor: 'not-allowed',
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiAppBar Component Customizations
  // --------------------------------------------------
  MuiAppBar: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        boxShadow: customShadows[3],
        transition: customTransitions.slow,
      }),
    },
  },
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
          [theme.breakpoints.down(450)]: {
            maxWidth: '95%',
            padding: 0,
          },
          '& .MuiTypography-root': {
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: 0,
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.9rem',
            },
          },
          '&.MuiSelect-dropdown-headers': {
            '& .MuiListSubheader-root': {
              backgroundColor: theme.palette.primary.main,
              padding: theme.spacing(1, 2),
              marginBottom: theme.spacing(1.5),
              width: '100%',
              [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(1),
              },
              [theme.breakpoints.down(450)]: {
                padding: theme.spacing(1, 1),
              },
              '& .MuiTypography-root': {
                color: theme.palette.text.primary,
                fontSize: '1.3rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: 0,
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1.1rem',
                },
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
  // MuiMenuItem Component Customizations
  // ---------------------------------------------------
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        padding: theme.spacing(0.5, 2, 1, 2),
        alignItems: 'flex-start',
        minHeight: 'auto',
        transition: customTransitions.standard,

        '& .checkbox-container': {
          overflow: 'visible',
          display: 'block',
          maxWidth: 19,
          maxHeight: 19,
          margin: theme.spacing(1, 1.5, 0, 0),
          boxSizing: 'border-box',
          border: `2px solid ${theme.palette.secondary.dark}`,
          borderRadius: customBorderRadius.small,
          [theme.breakpoints.down('sm')]: {
            maxWidth: 16,
            maxHeight: 16,
          },
        },
        '& .MuiCheckbox-root': {
          color: theme.palette.secondary.dark,
          top: -4,
          left: -1,
          [theme.breakpoints.down('sm')]: {
            top: -5,
            left: -1,
          },
        },
        '& .custom-checkbox': {
          transform: 'scale(1.2)',
        },
        '& .custom-checkbox-checked': {
          color: theme.palette.secondary.dark,
          transition: customTransitions.standard,
          paddingBottom: theme.spacing(0.4),

          [theme.breakpoints.down('sm')]: {
            transform: 'scale(1.7)',
            paddingRight: theme.spacing(0.45),
            paddingBottom: theme.spacing(0.5),
          },
        },
        '& .PrivateSwitchBase-input': {
          width: 36,
          height: 36,
          // backgroundColor: 'red',
        },
        '& .MuiTypography-root': {
          fontSize: '0.95rem',
          margin: 0,
          paddingTop: theme.spacing(0.45),
          [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
          },
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
};

export default navComponents;
