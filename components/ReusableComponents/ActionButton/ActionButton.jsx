import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './ActionButton.style';

const ActionButton = ({ text, buttonType = 'button', buttonVariant = 'contained', path = null, icon = null, onClick = null }) => {
    const classes = useStyles();
    return (
        <Button
            variant={buttonVariant}
            type={buttonType}
            color='primary'
            // className={classes.actionButton}
            startIcon={icon}
            {...(path && { href: path })}
            onClick={onClick}
        >
            {text}
        </Button >
    );
};

export default ActionButton;