'use client';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import ActionButton from '../../common/ActionButton/ActionButton';
import { CALL_BUTTON_TEXT, PHONE_NUMBER } from '../../../constants/companyDetails';

const CallButton = ({ size=null }) => {
  return <ActionButton text={CALL_BUTTON_TEXT} path={`tel:${PHONE_NUMBER}`} icon={<PhoneIcon />} size={size} />;
};

export default CallButton;
