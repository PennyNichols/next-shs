import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { useAuth } from '../../../hooks/auth/auth';
import theme from '@/theme/theme';
import useMedia from '../../../hooks/useMedia';

const AuthForm = () => {
  const { signIn, signUp, signOutUser, deleteAccount, getCurrentUser, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subscribeToMarketing, setSubscribeToMarketing] = useState(true); // subscribe by default
  const [localError, setLocalError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const { isMobile, isSmallTablet } = useMedia();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validate required fields
    if (!email || !password || (isSignUp && (!firstName || !lastName || !phoneNumber))) {
      setLocalError('Please fill in all fields.');
      return;
    }

    // Validate password match
    if (isSignUp && password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password, firstName, lastName, phoneNumber);
        // Optionally, handle additional user data (e.g., save firstName, lastName, phoneNumber to Firestore)
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: isMobile || isSmallTablet ? 600 : 400,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Button variant="text" color="primary" onClick={signOutUser}>
        Sign out
      </Button>
      <Button variant="text" color="primary" onClick={deleteAccount}>
        Delete account
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        {isSignUp ? 'Sign Up' : 'Login'}
      </Typography>
      <form onSubmit={handleSubmit}>
        {localError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {localError}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}
        {isSignUp && (
          <>
            <TextField
              label="First Name"
              type="text"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        )}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        {isSignUp && (
          <FormControlLabel
            control={
              <Checkbox
                checked={subscribeToMarketing}
                onChange={(e) => setSubscribeToMarketing(e.target.checked)}
                color="primary"
              />
            }
            label="Yes, I would like to subscribe to email marketing from SHS Florida"
            sx={{ mt: 2 }}
          />
        )}
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span
          style={{ fontWeight: 600, color: theme.palette.primary.light, cursor: 'pointer' }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? ' Login' : ' Sign Up'}
        </span>
      </Typography>
    </Box>
  );
};

export default AuthForm;
