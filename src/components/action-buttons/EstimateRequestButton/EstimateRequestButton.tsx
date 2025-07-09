'use client';

import React, { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import EstimateRequestForm from '../../forms/EstimateRequestForm/EstimateRequestForm';
import ActionButton from '../../common/ActionButton/ActionButton';
import { RequestQuoteRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';

const EstimateRequestButton = ({ size=null, fullWidth = false, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ActionButton
        text="Request an Estimate"
        size={size}
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
