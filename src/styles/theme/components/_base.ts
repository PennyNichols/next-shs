import { alpha } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius, customTransitions } from '../otherThemeConstants';

const svgDropShadowFilter = `%3Cdefs%3E%3Cfilter id='shadow' x='-70%25' y='-70%25' width='300%25' height='300%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='1' flood-color='%23000' flood-opacity='.3'/%3E%3C/filter%3E%3C/defs%3E`;

const baseComponents: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      html: {
        scrollbarGutter: 'stable',
        WebkitTapHighlightColor: 'transparent',
        '& .grecaptcha-badge': {
          position: 'fixed !important',
          bottom: '100px !important',
          right: '-157px !important',
          // marginRight: '-250px !important',
          zIndex: '10000 !important',
          opacity: '50% !important',
          transition: 'all 1s ease-in-out !important',
          transform: 'scale(0.5)',
          '&:hover': {
            opacity: '80% !important',
            transform: 'scale(0.5) translateX(-170px)',
          },
        },
      },

      body: {
        WebkitTapHighlightColor: 'transparent',
        '& .firebase-emulator-warning': {
          display: 'none !important',
        },
        '&::-webkit-scrollbar': {
          width: 13,
          height: 13,
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
          borderRadius: customBorderRadius.pill,
          border: `2.5px solid ${theme.palette.secondary.light}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.secondary.light,
        },
        '&::-webkit-scrollbar-button': {
          backgroundColor: theme.palette.secondary.light,
          height: 13,
          width: 13,
          // Default arrows are not visible, use background-image for custom arrows:
          webkitAppearance: 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },

        // Vertical scrollbar buttons
        '&::-webkit-scrollbar-button:vertical:start': {
          // Solid Rounded Up Triangle
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:vertical:end': {
          // Solid Rounded Down Triangle (rotated from up)
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(180 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(180 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:horizontal:start': {
          // Solid Rounded Left Triangle (rotated from up)
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(-90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(-90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          },
        },
        '&::-webkit-scrollbar-button:horizontal:end': {
          // Solid Rounded Right Triangle (rotated from up)
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.light)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
          '&:hover': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='3 4 18 19'>${svgDropShadowFilter}%3E%3Cpath fill='${encodeURIComponent(theme.palette.primary.dark)}' d='M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z' transform='rotate(90 12 12)' filter='url(%23shadow)'/%3E%3C/svg%3E")`,
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
          border: `4px solid ${theme.palette.secondary.light}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '& *::-webkit-scrollbar-track': {
          margin: theme.spacing(0, 1),
          backgroundColor: theme.palette.secondary.light,
          borderRadius: customBorderRadius.pill,
        },
        '& *::-webkit-scrollbar-button': {
          height: 0,
          width: 0,
        },
      },
      'a, button, input, [tabindex]': {
        WebkitTapHighlightColor: 'transparent',
      },

      // Autofill styles for input elements
      'input:-webkit-autofill': {
        // Change the background color, keeping a subtle transition
        WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
        WebkitTextFillColor: `${theme.palette.primary.light} !important`, // Text color
        caretColor: `${theme.palette.primary.light} !important`, // Cursor color
        transition: 'background-color 5000s ease-in-out 0s', // Long transition to keep the color
        letterSpacing: '1px',
      },
      'input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
        // Override hover/focus/active states for autofill
        WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
        WebkitTextFillColor: `${theme.palette.primary.light} !important`,
        caretColor: `${theme.palette.primary.light} !important`,
      },
      form: {},
    }),
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'xl',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        '&.page-wrapper': {
          minHeight: '100dvh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(4),
          paddingTop: theme.spacing(4),
          backgroundColor: theme.palette.background.default,
        },
      }),
    },
  },
  MuiDivider: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        flexGrow: 1,
        width: '70%',
        alignSelf: 'center',
        border: `1px solid ${theme.palette.accent.primary}`,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          margin: theme.spacing(4, 3),
        },
        '&.side': {
          margin: theme.spacing(0, 4),
          boxShadow: customShadows[1],
          width: 'auto',
          borderWidth: 1.5,
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        },
        '&.title-divider': {
          margin: theme.spacing(1, 'auto'),
          marginBottom: theme.spacing(5),
          maxWidth: '80%',
          [theme.breakpoints.down('xxs')]: {
            marginBottom: theme.spacing(1),
          },
        },
      }),
    },
  },
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
  MuiGrid: {
    defaultProps: {
      item: true,
    },
    styleOverrides: {
      root: ({ theme, ownerState }) => ({}),
    },
  },
};

export default baseComponents;
