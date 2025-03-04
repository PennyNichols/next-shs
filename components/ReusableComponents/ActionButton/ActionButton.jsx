import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './ActionButton.style';

const ActionButton = ({
  text,
  buttonType = 'button',
  buttonVariant = 'contained',
  color = 'primary',
  path = null,
  icon = null,
  onClick = null,
}) => {
  const classes = useStyles();
  return (
    <Button
      variant={buttonVariant}
      type={buttonType}
      color={color}
      // className={classes.actionButton}
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
