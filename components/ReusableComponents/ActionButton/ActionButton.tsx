import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button'; 
import { customTransitions } from '@/theme/otherThemeConstants'; 

interface ActionButtonProps extends Omit<ButtonProps, 'variant' | 'type' | 'onClick' | 'fullWidth' | 'startIcon' | 'sx' | 'color'> {
  text: string;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonVariant?: ButtonProps['variant'];
  path?: string | null;
  icon?: React.ReactNode | null; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  darkBackground?: boolean;
  fullWidth?: boolean;
  sx?: ButtonProps['sx'];
  color?: ButtonProps['color'];
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  buttonType = 'button',
  buttonVariant = 'contained',
  path = null,
  icon = null,
  onClick = undefined,
  darkBackground = false,
  fullWidth = false,
  sx, 
  color,
  ...props 
}) => {
  return (
    <Button
      variant={buttonVariant} 
      type={buttonType}
      startIcon={icon}
      sx={{
        backgroundColor: darkBackground ? 'accent.main' : 'primary.main',
        color: darkBackground ? 'primary.main' : 'secondary.light',
        border: `2px solid transparent`,
        transition: customTransitions.standard,
        '&:hover': {
          color: 'accent.main',
          backgroundColor: 'primary.main',
          borderColor: 'accent.main',
        },
        ...sx, 
      }}
      {...(path && {
        href: path,
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      onClick={onClick}
      fullWidth={fullWidth}
      color={color} 
      {...props} 
    >
      {text}
    </Button>
  );
};

export default ActionButton;