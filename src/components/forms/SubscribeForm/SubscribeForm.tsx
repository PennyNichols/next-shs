import React, { useState } from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';
import ActionButton from '../../common/ActionButton/ActionButton';
import { useFirebaseCollections } from '../../../contexts/FirebaseCollectionContext/FirebaseCollectionContext';
import CustomTextField from '@/components/common/CustomTextField';
import { useRecaptcha } from '@/hooks';
import { apiService } from '@/lib';
import theme from '@/styles/theme';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const [submissionError, setSubmissionError] = useState<string | null>(null); // State for submission errors

  const { createSubscriber } = useFirebaseCollections();

  const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state
    setSubmissionError(null); // Clear previous errors
    setMessage(''); // Clear previous success messages

    try {
      // 1. Execute reCAPTCHA to get a token
      // The action string 'subscribe_form' helps reCAPTCHA learn about traffic patterns
      const token = await executeRecaptcha('subscribe_form');

      if (!token) {
        setSubmissionError('reCAPTCHA verification failed. Please try again.');
        console.error('reCAPTCHA: Token generation failed or was empty.');
        return; // Stop the submission process
      }

      // 2. Send the reCAPTCHA token to your backend Cloud Function for verification
      const recaptchaResponse = await apiService.post('/verify-recaptcha', { token });

      // 3. Check the response from your backend's reCAPTCHA verification
      if (recaptchaResponse.data.success) {
        console.log('reCAPTCHA verified successfully. Score:', recaptchaResponse.data.score);

        // Optional: Implement a minimum score check on the frontend as well,
        // although your backend function should be the primary enforcer.
        // if (recaptchaResponse.data.score < 0.5) {
        //   setSubmissionError('Suspicious activity detected. Please try again or contact support.');
        //   return;
        // }

        // 4. If reCAPTCHA passed, proceed with creating the subscriber
        const resultMessage = await createSubscriber(email); // This calls the context method
        setMessage(resultMessage);

        if (resultMessage === 'Thank you for subscribing!') {
          setEmail(''); // Clear the email field on success
        }
      } else {
        // ReCAPTCHA verification failed on the backend
        const errorMessage = recaptchaResponse.data.message || 'reCAPTCHA verification failed. Please try again.';
        setSubmissionError(errorMessage);
        console.error('reCAPTCHA verification failed on backend:', errorMessage, recaptchaResponse.data.errorCodes);
      }
    } catch (error: any) {
      console.error('Error during subscription submission:', error);
      // More user-friendly error message
      setSubmissionError(
        error.response?.data?.error || 'An unexpected error occurred during subscription. Please try again.',
      );
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      sx={{
        display: 'flex',
        flexDirection: { xxs: 'column', sm: 'row' },
        alignItems: { xxs: 'stretch', md: 'center' },
      }}
    >
      <Grid item xxs={12} sm={6} md={7} sx={{ display: 'flex' }}>
        <CustomTextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email"
          color="secondary"
          sx={{
            flexShrink: 1,
            '& input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.primary.main} inset !important`,
              WebkitTextFillColor: `${theme.palette.accent.primary} !important`, // Text color
              caretColor: `${theme.palette.accent.primary} !important`, // Cursor color
              transition: 'background-color 5000s ease-in-out 0s', // Long transition to keep the color
              letterSpacing: '1px',
            },
            '& input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
              WebkitTextFillColor: `${theme.palette.accent.primary} !important`,
              caretColor: `${theme.palette.primary.light} !important`,
            },
          }}
        />
      </Grid>
      <Grid item xxs={12} sm={6} md={5} sx={{ display: 'flex' }}>
        <ActionButton type="submit" variant="contained" color="secondary" text="Subscribe" />
        {message && <Typography variant="body1">{message}</Typography>}
      </Grid>
    </Grid>
  );
};

export default SubscribeForm;
