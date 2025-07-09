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
      disableRipple: true,
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
        padding: theme.spacing(1, 2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: theme.spacing(0.5, 1), // Smaller padding for small size
        fontSize: '1rem', // Smaller font size for small buttons
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem', // Smaller icon size for small buttons
        },
      }),
      sizeMedium: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1, 2), // Default padding for medium size
        fontSize: '1.2rem', // Default font size for medium buttons
        '& .MuiSvgIcon-root': {
          fontSize: '1.4rem', // Default icon size for medium buttons
        },
      }),
      sizeLarge: ({ theme }: { theme: Theme }): CSSObject => ({
        padding: theme.spacing(1.5, 3), // Larger padding for large size
        fontSize: '1.3rem', // Larger font size for large buttons
        '& .MuiSvgIcon-root': {
          fontSize: '1.5rem', // Larger icon size for large buttons
        },
      }),
    },
  },
  //----------------------------------------------------
  // MuiIconButton Component Customizations
  // ---------------------------------------------------
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
};

export default buttonComponents;
