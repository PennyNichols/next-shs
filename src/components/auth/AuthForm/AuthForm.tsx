import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, FormControlLabel, Skeleton, Grid, Link } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import theme from '@/styles/theme';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';

const AuthForm = () => {
  const { signIn, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validate required fields
    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (err) {
      setLocalError(err.message);
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: { xxs: 600, md: 400 },
          padding: 3,
          borderRadius: customBorderRadius.small,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
          mx: 'auto',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
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
          <Grid container spacing={2}>
            <Grid xxs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid xxs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/sign-up" color="primary.main" sx={{ textDecoration: 'none', fontWeight: 'medium' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default AuthForm;
