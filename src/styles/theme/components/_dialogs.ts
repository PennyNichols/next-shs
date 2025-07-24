import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius } from '../otherThemeConstants';

const dialogComponents: Components<Theme> = {
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({}),
      paper: ({ theme }: { theme: Theme }): CSSObject => ({
        background: theme.palette.background.default,
        borderRadius: customBorderRadius.medium,
        boxShadow: customShadows[3],
        padding: theme.spacing(2),
        minHeight: '30vh',
        overflowX: 'hidden',
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        marginBottom: theme.spacing(1.5),
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: '1.5rem',
        letterSpacing: '0.06rem',
        textAlign: 'center',
        '& .MuiIconButton-root': {
          color: theme.palette.text.secondary,
          fontSize: '1.5rem',
          '&:hover': {
            color: theme.palette.accent.primary,
          },
          '& .MuiSvgIcon-root': {
            fontSize: '2rem',
            '& path': {
              strokeWidth: 2,
              stroke: 'currentColor',
            },
          },
        },
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.text.primary,
        fontSize: '1rem',
        background: 'transparent',
        display: 'flex',
        marginTop: theme.spacing(2),
        justifyContent: 'center',
        overflowX: 'hidden',
      }),
    },
  },
};

export default dialogComponents;
