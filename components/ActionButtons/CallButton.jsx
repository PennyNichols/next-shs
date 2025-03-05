import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { CALL_BUTTON_TEXT, PHONE_NUMBER } from '../../constants/constants';

const CallButton = () => {
  return <ActionButton text={CALL_BUTTON_TEXT} path={`tel:${PHONE_NUMBER}`} icon={<PhoneIcon />} />;
};

export default CallButton;
