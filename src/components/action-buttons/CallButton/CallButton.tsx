'use client';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import ActionButton from '../../common/ActionButton/ActionButton';
import { RingVolume } from '@mui/icons-material';
import { CALL_BUTTON_TEXT } from '@/constants/general';
import { COMPANY_PHONE_NUMBER } from '@/constants/companyDetails';

const CallButton = (props) => {
  return <ActionButton text={CALL_BUTTON_TEXT} path={`tel:${COMPANY_PHONE_NUMBER}`} icon={<RingVolume />} {...props} />;
};

export default CallButton;
