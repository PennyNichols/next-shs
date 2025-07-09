import React from 'react';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ActionButton from '../../common/ActionButton/ActionButton';
import { TEXT_BUTTON_TEXT, PHONE_NUMBER } from '../../../constants/companyDetails';

const CallButton = ({size=null}) => {
  return <ActionButton size={size} text={TEXT_BUTTON_TEXT} path={`sms:${PHONE_NUMBER}`} icon={<TextsmsIcon />} />;
};

export default CallButton;
