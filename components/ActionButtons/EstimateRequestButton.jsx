import React, { useState } from 'react';
import CustomModal from '../ReusableComponents/CustomModal/CustomModal';
import EstimateRequestForm from '../Forms/EstimateRequestForm/EstimateRequestForm';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { RequestQuoteRounded } from '@mui/icons-material';

const EstimateRequestButton = ({ isFooter = false }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <ActionButton text='Request an Estimate' onClick={handleOpen} icon={<RequestQuoteRounded />} color={isFooter ? 'secondary' : 'primary'} />
            <CustomModal open={open} handleClose={handleClose} title="Request an Estimate">
                <EstimateRequestForm setOpen={setOpen} />
            </CustomModal>
        </>
    );
};

export default EstimateRequestButton;