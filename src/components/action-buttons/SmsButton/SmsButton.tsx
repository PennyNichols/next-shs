import React from 'react';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ActionButton from '../../common/ActionButton/ActionButton';
import { TEXT_BUTTON_TEXT } from '@/constants/general';
import { COMPANY_PHONE_NUMBER } from '@/constants/companyDetails';

const CallButton = (props) => {
  return (
    <ActionButton text={TEXT_BUTTON_TEXT} path={`sms:${COMPANY_PHONE_NUMBER}`} icon={<TextsmsIcon />} {...props} />
  );
};

export default CallButton;
