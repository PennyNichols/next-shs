import React from 'react';
import Button from '@mui/material/Button';
import useStyles from './ActionButton.style';

const ActionButton = ({ text, path = null, icon = null, onClick = null }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.actionButton}
            startIcon={icon}
            {...(path && { href: path })}
            onClick={onClick}
        >
            {text}
        </Button >
    );
};

export default ActionButton;