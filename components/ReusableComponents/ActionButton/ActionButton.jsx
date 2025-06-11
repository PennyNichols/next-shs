import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './ActionButton.styles';

const ActionButton = ({
  text,
  buttonType = 'button',
  buttonVariant = 'contained',
  path = null,
  icon = null,
  onClick = null,
  darkBackground = false,
}) => {
  const classes = useStyles({ darkBackground });
  return (
    <Button
      variant={buttonVariant}
      type={buttonType}
      startIcon={icon}
      className={classes.actionButton}
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
