import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import useStyles from './SubscribeForm.styles';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { useFirebaseCollections } from '../../hooks/FirebaseService';

const SubscribeForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { addSubscriber } = useFirebaseCollections();

  const handleSubmit = async (e) => {
    console.log('handleSubmit called')
    e.preventDefault();
    console.log('handleSubmit called, email is: ', email);
    const resultMessage = await addSubscriber(email);
    console.log('resultMessage is: ', resultMessage);
    setMessage(resultMessage);
    if (resultMessage === 'Thank you for subscribing!') {
        setEmail('');
    }
};

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.formContainer}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        label="Email"
        variant="outlined"
        size="small"
        className={classes.input}
      />
      <ActionButton buttonType="submit" color="secondary" text="Subscribe" />
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default SubscribeForm;
