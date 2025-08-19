import React from 'react';
import ActionButton from '../../common/ActionButton/ActionButton';
import { RateReview } from '@mui/icons-material';
import theme from '@/styles/theme';
import { REVIEW_BUTTON_TEXT } from '@/constants/general';
import { COMPANY_GOOGLE_REVIEW_URL } from '@/constants/companyDetails';

const ReviewButton = (props) => {
  return (
    <ActionButton
      text={REVIEW_BUTTON_TEXT}
      variant="contained"
      color="secondary"
      iconColor={theme.palette.primary.main}
      icon={<RateReview />}
      path={COMPANY_GOOGLE_REVIEW_URL}
      {...props}
    />
  );
};

export default ReviewButton;
