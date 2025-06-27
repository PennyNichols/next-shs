import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant' | 'size' | 'margin'> {
  variant?: TextFieldProps['variant'];
  size?: TextFieldProps['size'];
  margin?: TextFieldProps['margin'];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  shrinkLabel?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  variant = 'outlined',
  size = 'small',
  margin = 'dense',
  fullWidth = true,
  startIcon,
  endIcon,
  shrinkLabel = false,
  InputProps,
  InputLabelProps,
  ...props
}) => {
  // Build InputProps with adornments if icons are provided
  const inputProps = {
    ...InputProps,
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      ),
    }),
  };

  // Build InputLabelProps with shrink option
  const inputLabelProps = {
    ...InputLabelProps,
    ...(shrinkLabel && { shrink: true }),
  };

  return (
    <TextField
      variant={variant}
      size={size}
      margin={margin}
      fullWidth={fullWidth}
      InputProps={inputProps}
      InputLabelProps={inputLabelProps}
      {...props}
    />
  );
};

export default CustomTextField;
