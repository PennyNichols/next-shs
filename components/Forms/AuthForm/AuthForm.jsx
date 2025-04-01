import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../../../hooks/auth/auth';
import theme from '@/theme/theme';
import useMedia from '../../../hooks/useMedia';

const AuthForm = () => {
  const { signIn, signUp, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const { isMobile, isSmallTablet } = useMedia();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }
    try {
      if (isSignUp) {
        await signUp(email, password);
        // ...handle successful sign-up (e.g., redirect or show success message)...
      } else {
        await signIn(email, password);
        // ...handle successful login (e.g., redirect or show success message)...
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
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
