import { alpha } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';
import { customBorderRadius, customTransitions } from '../otherThemeConstants';

const formComponents: Components<Theme> = {
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
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        borderRadius: customBorderRadius.small,
        backgroundColor: 'transparent',
        transition: theme.transitions.create(['box-shadow']),
        // Default/Primary color variant
        '&.MuiInputBase-colorPrimary': {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light,
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
        },
        // Secondary color variant - uses accent colors
        '&.MuiInputBase-colorSecondary': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.accent.primary,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.accent.primary,
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.accent.primary,
          },
        },
        '&.act-on-behalf': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.light,
          },
          '& span': {
            color: theme.palette.secondary.light,
          },
          '&.Mui-focused': {
            '& span': {
              color: theme.palette.accent.primary,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.accent.primary,
              borderWidth: '1px',
            },
          },
          '&:hover': {
            '& span': {
              color: theme.palette.accent.primary,
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.accent.primary,
              borderWidth: '1px',
            },
          },
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
        borderWidth: '1.5px',
        transition: theme.transitions.create(['border-color'], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
        '&.Mui-focused:not(:hover)': {},
      }),
      input: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        [theme.breakpoints.down('md')]: {
          fontSize: '0.875rem',
        },
        '&::placeholder': {
          color: alpha(theme.palette.secondary.dark, 0.6),
          opacity: 1,
        },
        // Primary color variant
        '.MuiInputBase-colorPrimary.Mui-focused &': {
          color: theme.palette.primary.light,
        },
        // Secondary color variant
        '.MuiInputBase-colorSecondary &': {
          color: theme.palette.secondary.light,
        },
        '.MuiInputBase-colorSecondary.Mui-focused &': {
          color: theme.palette.accent.primary,
        },
        '.MuiInputBase-colorSecondary:hover &': {
          color: theme.palette.accent.primary,
        },
        // Legacy focused state
        '.Mui-focused &': {
          color: theme.palette.primary.light,
        },
        '&[type="number"]': {
          MozAppearance: 'textfield',
          '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '1rem',
        fontWeight: 400,
        // Default/Primary color variant
        '&.MuiInputLabel-colorPrimary': {
          '&.Mui-focused': {
            fontSize: '1rem',
            color: theme.palette.primary.light,
            fontWeight: 400,
          },
        },
        // Secondary color variant - uses accent colors
        '&.MuiInputLabel-colorSecondary': {
          color: theme.palette.secondary.light,
          '&.Mui-focused': {
            fontSize: '1rem',
            color: theme.palette.accent.primary,
            fontWeight: 400,
          },
        },
        // Legacy focused state for backward compatibility
        '&.Mui-focused': {
          fontSize: '1rem',
          color: theme.palette.primary.light,
          fontWeight: 400,
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.1rem',
        },
      }),
      outlined: ({ theme }: { theme: Theme }): CSSObject => ({
        transform: 'translate(14px, 9px) scale(1)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -9px) scale(0.75)',
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
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }: { theme: Theme }): CSSObject => ({}),
    },
  },
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
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        // Primary color variant (default)
        '.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
          paddingRight: '0px !important',
        },
        '&.MuiInputBase-colorPrimary': {
          '&.Mui-focused': {
            '.MuiSvgIcon-root': {
              color: theme.palette.primary.light,
              fill: theme.palette.primary.light,
            },
          },
          '&:hover .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
            fill: theme.palette.primary.light,
          },
        },
        // Secondary color variant - uses accent colors
        '&.MuiInputBase-colorSecondary': {
          '.MuiSvgIcon-root': {
            color: theme.palette.accent.primary,
            fill: theme.palette.accent.primary,
          },
          '&.Mui-focused': {
            '.MuiSvgIcon-root': {
              color: theme.palette.accent.primary,
              fill: theme.palette.accent.primary,
              '&:last-of-type': {
                transform: 'rotate(180deg)',
              },
            },
          },
          '&:hover .MuiSvgIcon-root': {
            color: theme.palette.accent.primary,
            fill: theme.palette.accent.primary,
          },
        },
        '&.act-on-behalf': {
          paddingLeft: theme.spacing(0.7),
          paddingRight: theme.spacing(3),
          '.MuiSvgIcon-root': {
            color: theme.palette.secondary.light,
            fill: theme.palette.secondary.light,
          },
          '&.Mui-focused': {
            '.MuiSvgIcon-root': {
              color: theme.palette.accent.primary,
              fill: theme.palette.accent.primary,
              '&:last-of-type': {
                transform: 'rotate(180deg)',
              },
            },
          },
          '&:hover': {
            '.MuiSvgIcon-root': {
              color: theme.palette.accent.primary,
              fill: theme.palette.accent.primary,
            },
          },
        },
      }),
    },
  },
  MuiRadioGroup: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({}),
    },
  },
  MuiRadio: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        width: 25,
        height: 25,
        marginRight: theme.spacing(0.5),
        padding: theme.spacing(1),
        transition: theme.transitions.create(['color']),
        '& .MuiTouchRipple-root': {
          overflow: 'visible',
          position: 'absolute',
          // backgroundColor: 'red',
          width: 22,
          height: 22,
          top: -2,
          left: -2,
          [theme.breakpoints.down('sm')]: {
            width: 32,
            height: 32,
            top: -3,
            left: -3,
          },
          '& .MuiTouchRipple-child': {
            borderRadius: customBorderRadius.circle,
            // backgroundColor: 'red',
          },
        },
        '&.MuiCheckbox-root': {
          borderRadius: customBorderRadius.small,
        },
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
  MuiCheckbox: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        marginBottom: theme.spacing(0.5),
        marginLeft: theme.spacing(-0.25),
        borderRadius: customBorderRadius.small,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        marginRight: theme.spacing(2),
        marginLeft: 0,
        '& .MuiTypography-root': {
          margin: 0,
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
  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        '&.MuiFormControl-radioGroup': {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          '&.job-application': {
            alignItems: 'center',
            [theme.breakpoints.down('xxs')]: {
              alignItems: 'flex-start',
            },
          },
        },
        '& .MuiFormGroup-root': {
          marginLeft: theme.spacing(2),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        '& .MuiFormLabel-root.Mui-focused ~ .MuiRadioGroup-root': {
          '& .MuiRadio-root.Mui-checked, & .MuiRadio-root.Mui-checked + .MuiTypography-root ': {
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
        '&.act-on-behalf': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1.5px',
            borderColor: theme.palette.secondary.light,
          },
          '& .MuiFormLabel-root': {
            color: theme.palette.secondary.light,
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.secondary.light,
            marginRight: theme.spacing(0.5),
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.accent.primary,
            },
            '& .MuiFormLabel-root': {
              color: theme.palette.accent.primary,
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.accent.primary,
            },
          },
          '&.Mui-focused, &:has(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.accent.primary,
            },
            '& .MuiFormLabel-root': {
              color: theme.palette.accent.primary,
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.accent.primary,
            },
          },
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }): CSSObject => ({
        color: theme.palette.secondary.dark,
        fontSize: '1.1rem',
        [theme.breakpoints.down('md')]: {
          fontSize: '1rem',
        },
        '&.MuiFormLabel-colorSecondary': {
          color: theme.palette.accent.primary,
          '&.Mui-required .MuiFormLabel-asterisk': {
            color: theme.palette.accent.primary,
          },
        },
        '&.Mui-focused': {
          color: theme.palette.primary.light,
          '&.MuiFormLabel-colorSecondary': {
            color: theme.palette.accent.primary,
          },
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
          '&.MuiFormLabel-colorSecondary': {
            color: theme.palette.error.light,
          },
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
};

export default formComponents;
