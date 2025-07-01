import React, { useState } from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { useFirebaseCollections } from '../../hooks/FirebaseService';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { addSubscriber } = useFirebaseCollections();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultMessage = await addSubscriber(email);
    setMessage(resultMessage);
    if (resultMessage === 'Thank you for subscribing!') {
      setEmail('');
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
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
      }}
    >
      <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex' }}>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          label="Email"
          variant="outlined"
          size="small"
          sx={{
            flexGrow: 1,
            '& .MuiInputBase-input': {
              color: 'accent.main',
            },
            '& .MuiInputLabel-root': {
              color: 'accent.main',
              '&.Mui-focused': {
                color: 'accent.main',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'accent.main',
              },
              '&:hover fieldset': {
                borderColor: 'accent.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'accent.main',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
        <ActionButton type="submit" variant="contained" color="secondary" text="Subscribe" />
        {message && <Typography variant="body1">{message}</Typography>}
      </Grid>
    </Grid>
  );
};

export default SubscribeForm;
