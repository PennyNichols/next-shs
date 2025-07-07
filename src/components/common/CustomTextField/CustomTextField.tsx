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
  shrinkLabel = true,
  InputProps,
  InputLabelProps,
  value,
  type = 'text',
  ...props
}) => {
  const inputProps = {
    ...InputProps,
    ...(startIcon && {
      startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
    }),
    ...(endIcon && {
      endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
    }),
  };

  const inputLabelProps = {
    ...InputLabelProps,
    ...(shrinkLabel && { shrink: true }),
  };

  const displayValue = type === 'number' && value === null ? '' : value;

  return (
    <TextField
      variant={variant}
      size={size}
      margin={margin}
      fullWidth={fullWidth}
      InputProps={inputProps}
      InputLabelProps={inputLabelProps}
      value={displayValue}
      type={type}
      {...props}
    />
  );
};

export default CustomTextField;
