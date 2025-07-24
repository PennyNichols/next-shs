'use client';

import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { customShadows } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';
import { useMedia } from '@/hooks';

interface NavButtonProps
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

const NavButton: React.FC<NavButtonProps> = ({
  text,
  size = null,
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
  className = '',
  onClick = undefined,
  ...props
}) => {
  const [scale, setScale] = useState(1);


  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      className={className}
      sx={{
        display: 'flex',
        gap: 1,
        border: 'none',
        boxShadow: 'none',
        transform: `scale(${scale})`,
        transition: 'all 0.5s ease-in-out, transform 0.1s ease-in-out',
        fontSize: { xxs: '1rem', xs: '1.2rem', sm: '1.4rem', md: '1.3rem', lg: '1.5rem' },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          letterSpacing: '0.2rem',
          color: theme.palette.accent.primary,
          textShadow: `0px 5px 14px ${theme.palette.accent.primary}, 0px 5px 20px ${theme.palette.accent.primary}`,
        },
        '&:focus': {
          outline: 'none',
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
      onTouchStart={() => setScale(0.9)}
      onTouchEnd={() => setScale(1)}
      {...props}
    >
      {text}
    </Button>
  );
};

export default NavButton;
