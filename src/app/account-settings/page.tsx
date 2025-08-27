'use client';

import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

/**
 * Main account settings page that routes to role-specific settings
 */
const AccountSettingsPage = () => {
  const { user, loading } = useUser();
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Route to role-specific settings page
      const userRole = user.role || currentUser?.role || 'client';
      
      switch (userRole) {
        case 'super':
          router.replace('/account-settings/super');
          break;
        case 'admin':
          router.replace('/account-settings/admin');
          break;
        case 'employee':
          router.replace('/account-settings/employee');
          break;
        case 'contractor':
          router.replace('/account-settings/contractor');
          break;
        case 'client':
        default:
          router.replace('/account-settings/client');
          break;
      }
    }
  }, [user, loading, currentUser, router]);

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading account settings...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Please sign in to access account settings.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
        Redirecting to your account settings...
      </Typography>
    </Box>
  );
};

export default AccountSettingsPage;
