import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customShadows, customBorderRadius } from '../otherThemeConstants'; // Assuming these are correctly typed as discussed

const dialogComponents: Components<Theme> = {
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
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        '& .MuiIconButton-root': {
          color: theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.accent.primary,
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
};

export default dialogComponents;
