import { alpha } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from '../otherThemeConstants'; // Assuming these are correctly typed as discussed

const contentComponents: Components<Theme> = {
  // ---------------------------------------------------
  // MuiTypography Component Customizations
  // ---------------------------------------------------
  MuiTypography: {
    variants: [
      {
        props: {
          variant: 'pageTitle',
        },
        style: ({ theme }: { theme: Theme }) => ({
          display: 'block',
          fontSize: '2.4rem',
          fontWeight: 600,
          lineHeight: 1.5,
          color: theme.palette.primary.main,
          letterSpacing: 0.5,
          textAlign: 'center',
          margin: '0 auto',
          whiteSpace: 'nowrap',
          marginBottom: '1.5rem',
          [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
            whiteSpace: 'normal',
          },
          [theme.breakpoints.down(500)]: {
            fontSize: '1.8rem',
            lineHeight: 1.3,
          },
        }),
      },
      {
        props: { variant: 'sectionTitle' },
        style: ({ theme }: { theme: Theme }) => ({
          display: 'block',
          fontSize: '1.6rem',
          fontWeight: 500,
          lineHeight: 1.1,
          color: theme.palette.primary.main,
          letterSpacing: 0.5,
          marginBottom: theme.spacing(3.5),
          [theme.breakpoints.down(500)]: {
            fontSize: '1.4rem',
            lineHeight: 1.1,
          },
        }),
      },
    ],
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }: { theme: Theme; ownerState: any }): CSSObject => ({}),
      h1: ({ theme }: { theme: Theme }): CSSObject => ({
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: 600,
        lineHeight: 1.2,
        color: theme.palette.primary.dark,
        letterSpacing: 1.5,
        [theme.breakpoints.down(500)]: {
          fontSize: '2.2rem',
          lineHeight: 1.5,
        },
      }),
      h2: ({ theme }: { theme: Theme }): CSSObject => ({
        textAlign: 'center',
        fontSize: '2.4rem',
        fontWeight: 600,
        lineHeight: 1.5,
        color: theme.palette.primary.main,
        letterSpacing: 0.5,
        [theme.breakpoints.down(500)]: {
          fontSize: '1.9rem',
          lineHeight: 1.25,
        },
      }),
      h3: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.6rem',
        fontWeight: 600,
        lineHeight: 1.5,
        color: theme.palette.primary.main,
        letterSpacing: 0.2,
        [theme.breakpoints.down('sm')]: {
          textAlign: 'center',
        },
        [theme.breakpoints.down(500)]: {
          fontSize: '1.4rem',
          lineHeight: 1.6,
        },
      }),
      h4: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.6rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: theme.palette.primary.main,
        letterSpacing: 0.5,
        [theme.breakpoints.down(500)]: {
          fontSize: '1.4rem',
          lineHeight: 1.6,
        },
      }),
      h5: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.4rem',
        fontWeight: 500,
        lineHeight: 1.3,
        color: theme.palette.secondary.dark,
        letterSpacing: 0.2,
        [theme.breakpoints.down(500)]: {
          fontSize: '1.25rem',
          lineHeight: 1.2,
        },
      }),
      h6: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.2rem',
        fontWeight: 500,
        lineHeight: 1.15,
        color: theme.palette.primary.light,
        letterSpacing: 0.2,
        [theme.breakpoints.down(500)]: {
          fontSize: '1.15rem',
          lineHeight: 1,
        },
      }),
      body1: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '1.1rem',
        lineHeight: 1.25,
        color: theme.palette.secondary.dark,
        letterSpacing: 0.2,

        '&.contact-link-label': {
          marginBottom: theme.spacing(0.7),
          [theme.breakpoints.down(500)]: {
            fontSize: '0.9rem',
            lineHeight: 1,
          },
        },
        [theme.breakpoints.down('sm')]: {
          textAlign: 'center',
        },
      }),
      body2: ({ theme }: { theme: Theme }): CSSObject => ({
        fontSize: '0.875rem',
        lineHeight: 1.2,
        color: theme.palette.secondary.dark,
        letterSpacing: 0.2,
        [theme.breakpoints.down(500)]: {
          fontSize: '0.85rem',
          lineHeight: 1.1,
        },
      }),
    },
  },
  // ---------------------------------------------------
  // MuiIcon Component Customizations
  // ---------------------------------------------------
  MuiChip: {
    defaultProps: {
      size: 'small',
      color: 'primary',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: customBorderRadius.pill,
        boxShadow: customShadows[1],
        color: theme.palette.secondary.dark,
        fontSize: '0.875rem',
        padding: theme.spacing(0.5, 1),
        '& .MuiChip-label': {
          paddingLeft: theme.spacing(0.5),
          paddingRight: theme.spacing(0.5),
        },
        '&.MuiChip-outlined': {
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
        },
      }),
      colorPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
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
  // MuiIcon Component Customizations
  // ---------------------------------------------------
  MuiIcon: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({}),
    },
  },
  // ---------------------------------------------------
  // MuiCard Component Customizations (for the main question label)
  // --------------------------------------------------
  MuiCard: {
    defaultProps: {
      variant: 'outlined',
      elevation: 3,
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.small,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        '&.review-card': {
          width: 220,
          height: 260,
          border: 'none',
          boxShadow: customShadows[2],
          background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.5)})} 100%, rgba(237,235,243,0.18) 100%)`,
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          '& .MuiTypography-root': {
            padding: 0,
            margin: 0,
            textAlign: 'center',
          },
        },
      }),
    },
  },
};
export default contentComponents;
