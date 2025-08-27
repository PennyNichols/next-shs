'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Grid,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/firebase';
import CustomCheckbox from '@/components/common/CustomCheckbox';

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [subscribeToMarketing, setSubscribeToMarketing] = useState(true);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribe: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    // Basic validation
    if (!data.email || !data.password || !data.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (data.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!data.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create user document in Firestore with correct field names for security rules
      const currentTime = new Date();
      const userData = {
        role: 'client', // Use 'role' instead of 'type' for security rules
        first: '', // Empty for now, can be filled later
        last: '', // Empty for now, can be filled later
        phone: '', // Empty for now, can be filled later
        email: data.email,
        profilePictureURL: '',
        signatureURL: '',
        activeOn: currentTime.toISOString(),
        status: 'active',
        emailVerified: false,
        createdAt: serverTimestamp(), // Use server timestamp for security rules
        createdOn: currentTime.toISOString(), // Keep for compatibility
        updatedOn: currentTime.toISOString(),
        primaryAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA',
        },
        serviceAddresses: [],
        communicationPreferences: {
          email: true,
          sms: true,
          phone: true,
          push: true,
          marketing: false,
          serviceReminders: true,
          estimateUpdates: true,
          promotions: false,
        },
        notes: [],
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      setSuccess(true);

      // Redirect to client dashboard
      setTimeout(() => {
        router.push('/client/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Account created successfully!
        </Alert>
        <CircularProgress sx={{ color: 'primary.main' }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Redirecting you to your dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label="Email Address" type="email" required />}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label="Password" type="password" required />}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label="Confirm Password" type="password" required />}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<CustomCheckbox {...field} checked={field.value} />}
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="/service-terms" color="primary.main">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" color="primary.main">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="subscribe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={subscribeToMarketing}
                    onChange={(e) => setSubscribeToMarketing(e.target.checked)}
                  />
                }
                label="Yes, I would like to subscribe to email marketing from SHS Florida"
                sx={{ mt: 1, alignItems: 'flex-start' }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          mb: 2,
          py: 1.5,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="secondary.main">
          Already have an account?{' '}
          <Link href="/sign-in" color="primary.main" sx={{ textDecoration: 'none', fontWeight: 'medium' }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
