'use client';

import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

/**
 * Main dashboard page that routes to role-specific dashboards
 */
const DashboardPage = () => {
  const { user, loading } = useUser();
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Route to role-specific dashboard page
      const userRole = user.role || currentUser?.role || 'client';
      
      switch (userRole) {
        case 'super':
          router.replace('/dashboard/super');
          break;
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        case 'employee':
          router.replace('/dashboard/employee');
          break;
        case 'contractor':
          router.replace('/dashboard/contractor');
          break;
        case 'client':
        default:
          router.replace('/dashboard/client');
          break;
      }
    }
  }, [user, loading, currentUser, router]);

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Please sign in to access your dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">
        Redirecting to your dashboard...
      </Typography>
    </Box>
  );
};

export default DashboardPage;
