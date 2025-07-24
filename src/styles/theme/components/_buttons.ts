'use client';
import { alpha } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from '../otherThemeConstants'; // Assuming these are correctly typed as discussed

const buttonComponents: Components<Theme> = {
  //----------------------------------------------------
  // MuiButton Component Customizations
  // ---------------------------------------------------
  MuiButton: {
    defaultProps: {
      disableFocusRipple: true,
      disableTouchRipple: true,
      disableRipple: true,
      variant: 'contained',
      color: 'primary',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        textTransform: 'uppercase',
        fontWeight: 600,
        letterSpacing: '0.07rem',
        boxShadow: customShadows[2],
        borderRadius: customBorderRadius.small,
        border: `2px solid transparent`,
        transition: customTransitions.standard,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        padding: theme.spacing(0.75, 2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        [theme.breakpoints.up('xxs')]: {
          fontSize: '0.875rem',
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.2rem',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.8rem',
        },
        '& .MuiButton-startIcon': {
          marginRight: theme.spacing(1),
          [theme.breakpoints.up('xxs')]: {
            fontSize: '1.25rem',
          },
          [theme.breakpoints.up('xs')]: {
            fontSize: '1.5rem',
          },
          [theme.breakpoints.up('md')]: {
            fontSize: '1.75rem',
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: '1.9rem',
          },
          [theme.breakpoints.up('xl')]: {
            fontSize: '2.1rem',
          },
          '& > *:nth-of-type(1)': {
            marginRight: theme.spacing(1),
            [theme.breakpoints.up('xxs')]: {
              fontSize: '1.25rem',
            },
            [theme.breakpoints.up('xs')]: {
              fontSize: '1.5rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '1.75rem',
            },
            [theme.breakpoints.up('lg')]: {
              fontSize: '1.9rem',
            },
            [theme.breakpoints.up('xl')]: {
              fontSize: '2.1rem',
            },
          },
        },
        '& .MuiSvgIcon-root': {},
        '&:hover': {
          boxShadow: customShadows[2],
        },
      }),
      startIcon: ({ theme }: { theme: Theme }): CSSObject => ({
        // SAVE THIS PLACE
      }),
      // Style overrides based on 'variant' prop
      containedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
        '&:hover': {
          color: theme.palette.accent.primary,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.accent.primary,
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.accent.primary,
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.accent.primary,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.accent.primary,
        },
      }),
      outlinedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          color: theme.palette.accent.primary,
          border: `2px solid ${theme.palette.accent.primary}`,
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
      // Style overrides based on 'size' prop
      sizeSmall: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1rem',
      }),
      sizeMedium: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.4rem',
      }),
      sizeLarge: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1.5, 3),
        fontSize: '1.9rem',
      }),
    },
  },
  //----------------------------------------------------
  // MuiIconButton Component Customizations
  // ---------------------------------------------------
  MuiIconButton: {
    defaultProps: {
      color: 'inherit',
      disableFocusRipple: true,
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        transition: customTransitions.standard,
        borderRadius: customBorderRadius.small,
        padding: theme.spacing(1),
        '&:hover': {
          transform: 'scale(1.2)',
        },
        '&:focus': {
          outline: 'none',
          background: 'transparent',
        },
        '&:focus-visible': {
          background: 'transparent',
          outline: 'none',
        },
        '&.Mui-disabled': {
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
        padding: theme.spacing(0.5),
        fontSize: '1.125rem',
      }),
      sizeMedium: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1),
        fontSize: '1.5rem',
      }),
      sizeLarge: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1.5),
        fontSize: '2.6rem',
      }),
    },
  },
};

export default buttonComponents;
