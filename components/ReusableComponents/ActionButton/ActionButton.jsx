import React from 'react';
import Button from '@mui/material/Button';

const ActionButton = ({ text, path, icon }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={icon}
            href={`${path}`}
        >
            {text}
        </Button>
    );
};

export default ActionButton;