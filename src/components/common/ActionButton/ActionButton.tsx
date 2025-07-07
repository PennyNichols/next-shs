import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { customShadows } from '@/theme/otherThemeConstants';

interface ActionButtonProps
  extends Omit<ButtonProps, 'variant' | 'type' | 'onClick' | 'fullWidth' | 'startIcon' | 'sx' | 'color'> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  sx?: ButtonProps['sx'];
  icon?: React.ReactNode | null;
  iconColor?: string | null;
  iconHoverColor?: string | null;
  fullWidth?: boolean;
  path?: string | null;
  target?: string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  sx,
  icon = null,
  iconColor = null,
  iconHoverColor = null,
  fullWidth = false,
  path = null,
  target = null,
  onClick = undefined,
  ...props
}) => {
  const [scale, setScale] = useState(1);
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={{
        display: 'flex',
        gap: 1,
        boxShadow: { xs: customShadows[10], xl: customShadows[10] },
        fontSize: { xs: '1.2rem', xl: '2rem' },
        transform: `scale(${scale})`,
        transition: 'all 0.5s ease-in-out, transform 0.1s ease-in-out',
        '& .MuiSvgIcon-root': {
          fontSize: { xs: '1.5rem', xl: '2.5rem' },
          color: iconColor || 'secondary.light',
          transition: 'all 0.5s ease-in-out',
        },
        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: iconHoverColor || 'accent.primary',
          },
        },
        ...sx,
      }}
      startIcon={icon}
      fullWidth={fullWidth}
      {...(path && {
        href: path,
        target: target,
        rel: 'noopener noreferrer',
      })}
      onClick={onClick}
      onMouseDown={() => setScale(0.9)}
      onMouseUp={() => setScale(1)}
      {...props}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
