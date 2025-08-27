'use client';

import React from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import PageContainer from '@/components/common/PageContainer/PageContainer';
import { getDashboardRouteForRole } from '@/lib/utils/roleBasedRouting';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { currentUser, loading: authLoading, signingOut } = useAuth();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  // If user is signing out, show loading and redirect to home
  if (signingOut) {
    router.replace('/');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" flexDirection="column" gap={2}>
        <CircularProgress />
        <Typography>Signing out...</Typography>
      </Box>
    );
  }

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
      <PageContainer>
        <Box sx={{ mx: 'auto' }}>
          <Typography component="h2" variant="h2">
            Please sign in to access this page.
          </Typography>
        </Box>
      </PageContainer>
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
  if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role || 'client')) {
    const userDashboardRoute = getDashboardRouteForRole(currentUser.role || 'client');

    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Access denied. You don't have permission to view this page.
        </Alert>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Required roles: {allowedRoles.join(', ')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Your role: {currentUser.role || 'No role assigned'}
        </Typography>
        <Button variant="contained" onClick={() => router.push(userDashboardRoute)}>
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
  <RouteGuard allowedRoles={['admin', 'super']}>{children}</RouteGuard>
);

export const StaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['admin', 'super', 'employee']}>{children}</RouteGuard>
);

export const EmployeeRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['employee', 'admin', 'super']}>{children}</RouteGuard>
);

export const ContractorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['contractor', 'admin', 'super']}>{children}</RouteGuard>
);

export const ClientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard allowedRoles={['client', 'admin', 'super', 'employee']}>{children}</RouteGuard>
);

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteGuard requireAuth={true}>{children}</RouteGuard>
);
