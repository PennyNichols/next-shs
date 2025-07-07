import React, { useState } from 'react';
import CustomModal from '../ReusableComponents/CustomModal/CustomModal';
import EstimateRequestForm from '../Forms/EstimateRequestForm/EstimateRequestForm';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { RequestQuoteRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';

const EstimateRequestButton = ({ fullWidth = false, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ActionButton
        text="Request an Estimate"
        fullWidth={fullWidth}
        onClick={handleOpen}
        icon={<RequestQuoteRounded />}
        {...props}
      />
      <EstimateRequestForm open={open} setOpen={setOpen} />
    </>
  );
};

EstimateRequestButton.propTypes = {
  isFooter: PropTypes.bool,
};

export default EstimateRequestButton;
