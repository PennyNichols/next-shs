import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CustomModal from '../ReusableComponents/CustomModal/CustomModal';
import { Typography } from '@mui/material';

const RequestButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Request an Estimate
            </Button>
            <CustomModal open={open} handleClose={handleClose} title="Request an Estimate">
                <Typography>Please fill out the form below to request an estimate.</Typography>
                {/* Add form fields here */}
            </CustomModal>
        </>
    );
};

export default RequestButton;