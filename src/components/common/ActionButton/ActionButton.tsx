'use client';

import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { customShadows, customTransitions } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';
import { useMedia } from '@/hooks';

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
  fullWidth?: boolean | { [key: string]: boolean };
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
        boxShadow: { xxs: customShadows[5], lg: customShadows[10] },
        transform: `scale(${scale})`,
        transition: customTransitions.standard,
        ...sx,
      }}
      startIcon={icon}
      fullWidth={fullWidth as any}
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

export default ActionButton;
