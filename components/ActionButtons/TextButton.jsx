import React from 'react';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { TEXT_BUTTON_TEXT, PHONE_NUMBER } from '../../constants/constants';

const CallButton = () => {
    return (
        <ActionButton text={TEXT_BUTTON_TEXT} path={`sms:${PHONE_NUMBER}`} icon={<TextsmsIcon />} />
    );
};

export default CallButton;