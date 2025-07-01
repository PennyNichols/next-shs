import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { customTransitions } from '@/theme/otherThemeConstants';

interface ActionButtonProps
  extends Omit<ButtonProps, 'variant' | 'type' | 'onClick' | 'fullWidth' | 'startIcon' | 'sx' | 'color'> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  sx?: ButtonProps['sx'];
  icon?: React.ReactNode | null;
  fullWidth?: boolean;
  path?: string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  sx,
  icon = null,
  fullWidth = false,
  path = null,
  onClick = undefined,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={{
        ...sx,
      }}
      startIcon={icon}
      fullWidth={fullWidth}
      {...(path && {
        href: path,
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
