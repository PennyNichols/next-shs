import React from 'react';
import Button from '@mui/material/Button';

const ActionButton = ({
  text,
  buttonType = 'button',
  buttonVariant = 'contained',
  color = 'primary',
  path = null,
  icon = null,
  onClick = null,
}) => {
  return (
    <Button
      variant={buttonVariant}
      type={buttonType}
      color={color}
      startIcon={icon}
      {...(path && {
        href: path,
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
