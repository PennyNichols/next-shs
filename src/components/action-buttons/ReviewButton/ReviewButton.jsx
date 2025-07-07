import React from 'react';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { GOOGLE_REVIEW_URL, REVIEW_BUTTON_TEXT } from '../../../constants/companyDetails';
import { RateReview } from '@mui/icons-material';

const ReviewButton = (props) => {
  return (
    <ActionButton
      text={REVIEW_BUTTON_TEXT}
      variant="contained"
      color="secondary"
      icon={<RateReview />}
      path={GOOGLE_REVIEW_URL}
      {...props}
    />
  );
};

export default ReviewButton;
