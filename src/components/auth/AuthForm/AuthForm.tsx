import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Alert, FormControlLabel, Skeleton } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import useMedia from '../../../hooks/useMedia';
import theme from '@/styles/theme';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import CustomCheckbox from '@/components/common/CustomCheckbox';

const AuthForm = () => {
  const { signIn, signUp, signOutUser, deleteAccount, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subscribeToMarketing, setSubscribeToMarketing] = useState(true); // subscribe by default
  const [localError, setLocalError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const { isXxs: initialIsXxs, isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isXxs, setIsXxs] = useState(false);
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsXxs(initialIsXxs);
    setIsXs(initialIsXs);
    setIsSm(initialIsSm);
  }, [initialIsXxs, initialIsXs, initialIsSm]);

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
    <React.Fragment>
      {!showClientContent ? (
        <Box
          sx={{
            maxWidth: 400,
            padding: 3,
            borderRadius: customBorderRadius.small,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          {/* Skeleton for sign out and delete buttons */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Skeleton variant="rectangular" width={80} height={36} />
            <Skeleton variant="rectangular" width={120} height={36} />
          </Box>

          {/* Skeleton for title */}
          <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto', mb: 2 }} />

          {/* Skeleton for form fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={56} />
            <Skeleton variant="rectangular" width="100%" height={56} />
            <Skeleton variant="rectangular" width="100%" height={48} sx={{ mt: 1 }} />
          </Box>

          {/* Skeleton for toggle text */}
          <Skeleton variant="text" width="70%" height={20} sx={{ mx: 'auto', mt: 2 }} />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: isXxs || isXs || isSm ? 600 : 400,
            padding: 3,
            borderRadius: customBorderRadius.small,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Button variant="text" color="primary" onClick={signOutUser}>
            Sign out
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={async () => {
              const password = window.prompt('Please enter your password to delete your account:');
              if (password) {
                try {
                  await deleteAccount(password);
                } catch (err) {
                  setLocalError(err.message);
                }
              }
            }}
          >
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
                  <CustomCheckbox
                    checked={subscribeToMarketing}
                    onChange={(e) => setSubscribeToMarketing(e.target.checked)}
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
            </span>{' '}
          </Typography>
        </Box>
      )}
    </React.Fragment>
  );
};

export default AuthForm;
