'use client';

import React, { useState } from 'react';
import EstimateRequestForm from '../../forms/EstimateRequestForm/EstimateRequestForm';
import ActionButton from '../../common/ActionButton/ActionButton';
import { Description } from '@mui/icons-material';
import PropTypes from 'prop-types';
import theme from '@/styles/theme';

const EstimateRequestButton = (props) => {
  const { fullWidth = false, iconColor = theme.palette.secondary.light, ...restProps } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ActionButton
        text="Request an Estimate"
        icon={<Description />}
        onClick={handleOpen}
        iconColor={iconColor}
        fullWidth={fullWidth}
        {...restProps}
      />
      <EstimateRequestForm open={open} setOpen={setOpen} />
    </>
  );
};

EstimateRequestButton.propTypes = {
  isFooter: PropTypes.bool,
};

export default EstimateRequestButton;
