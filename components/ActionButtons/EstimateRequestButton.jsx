import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CustomModal from '../ReusableComponents/CustomModal/CustomModal';
import EstimateRequestForm from '../Forms/EstimateRequestForm/EstimateRequestForm';
import useStyles from './ActionButtons.styles';

const EstimateRequestButton = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <Button className={classes.quoteButton} variant='contained' onClick={handleOpen}>
                Request an Estimate
            </Button>
            <CustomModal open={open} handleClose={handleClose} title="Request an Estimate">
                <EstimateRequestForm setOpen={setOpen} />
            </CustomModal>
        </>
    );
};

export default EstimateRequestButton;