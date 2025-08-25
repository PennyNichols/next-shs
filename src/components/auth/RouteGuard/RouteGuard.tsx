'use client';

import React from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  // Show loading while checking authentication
  if (authLoading || userLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" flexDirection="column" gap={2}>
        <CircularProgress />
        <Typography>Checking permissions...</Typography>
      </Box>
    );
  }

  // Check if authentication is required
  if (requireAuth && !currentUser) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please sign in to access this page.
        </Alert>
        <Button variant="contained" onClick={() => router.push('/sign-in')}>
          Sign In
        </Button>
      </Box>
    );
  }

  // Check if user data is available when required
  if (requireAuth && currentUser && !user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to load user profile. Please try again.
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </Box>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.type)) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Access denied. You don't have permission to view this page.
        </Alert>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Required roles: {allowedRoles.join(', ')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Your role: {user.type}
        </Typography>
        <Button variant="contained" onClick={() => router.push('/client/dashboard')}>
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  // Check if user status is active
  if (user && user.status !== 'active') {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Your account is currently {user.status}. Please contact support for assistance.
        </Alert>
        <Button variant="contained" onClick={() => router.push('/contact')}>
          Contact Support
        </Button>
      </Box>
    );
  }

  // All checks passed, render the protected content
  return <>{children}</>;
};

// Convenience components for specific roles
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['admin']}>{children}</RouteGuard>
);

export const StaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['admin', 'employee']}>{children}</RouteGuard>
);

export const ClientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['client', 'admin', 'employee']}>{children}</RouteGuard>
);

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard requireAuth={true}>{children}</RouteGuard>
);
