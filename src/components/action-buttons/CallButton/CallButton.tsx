'use client';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import ActionButton from '../../common/ActionButton/ActionButton';
import { CALL_BUTTON_TEXT, PHONE_NUMBER } from '../../../constants/companyDetails';
import { RingVolume } from '@mui/icons-material';

const CallButton = () => {
  return <ActionButton text={CALL_BUTTON_TEXT} path={`tel:${PHONE_NUMBER}`} icon={<RingVolume />} />;
};

export default CallButton;
