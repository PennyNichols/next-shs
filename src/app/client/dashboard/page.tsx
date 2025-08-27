'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
} from '@mui/material';
import { Person, Home, RequestQuote, Assignment, Schedule, Email } from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import useUser from '@/hooks/auth/useUser';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { getAssignableRoles, getRoleDisplayName, UserRole } from '@/lib/utils/roleUtils';
import { DashboardNavigation } from '@/components/navigation/DashboardNavigation';

const ClientDashboardContent = () => {
  const { user, loading } = useUser(); // Firestore user data
  const { currentUser } = useAuth(); // Firebase Auth user with custom claims
  const { setUserRole, checkUserClaims } = useAdmin();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'requests' | 'appointments'>(
    'dashboard',
  );
  console.log('Current user data:', user);
  console.log('Current auth user:', currentUser);
  console.log('Current user role:', currentUser?.role);
  console.log('Is admin?', currentUser?.role === 'admin');

  const handleSetUserRole = async (uid: string, role: UserRole) => {
    await setUserRole(uid, role);
  };

  const handleSetRole = (role: UserRole) => {
    if (user?.id) {
      handleSetUserRole(user.id, role);
    }
  };

  // Get roles that the current user can assign
  const assignableRoles = currentUser?.role ? getAssignableRoles(currentUser.role) : [];

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your dashboard...
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

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
      case 'requests':
        return <EstimateRequestsView />;
      case 'appointments':
        return <AppointmentsView />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <Box>
      <DashboardNavigation />
      {/* Section Navigation */}
      <Box sx={{ mb: 3, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome back, {user.first}!
        </Typography>
        {currentUser?.role && (
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Current Role: {getRoleDisplayName(currentUser.role)}
          </Typography>
        )}
        {assignableRoles.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            {assignableRoles.map((role) => (
              <Button
                key={role}
                variant={currentUser?.role === role ? 'contained' : 'outlined'}
                color={
                  role === 'super'
                    ? 'error'
                    : role === 'admin'
                      ? 'primary'
                      : role === 'employee'
                        ? 'secondary'
                        : role === 'contractor'
                          ? 'warning'
                          : 'info'
                }
                onClick={() => handleSetRole(role)}
              >
                Set {getRoleDisplayName(role)} Role
              </Button>
            ))}
            <Button variant="outlined" color="inherit" onClick={checkUserClaims}>
              Check Current Claims
            </Button>
          </Box>
        )}
        {assignableRoles.length === 0 && currentUser?.role && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
            <Typography variant="body2">
              You don't have permission to assign roles. Contact an administrator if you need role changes.
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <Home /> },
            { key: 'profile', label: 'My Profile', icon: <Person /> },
            { key: 'requests', label: 'My Requests', icon: <RequestQuote /> },
            { key: 'appointments', label: 'Appointments', icon: <Schedule /> },
          ].map((item) => (
            <Button
              key={item.key}
              variant={activeSection === item.key ? 'contained' : 'outlined'}
              onClick={() => setActiveSection(item.key as any)}
              startIcon={item.icon}
              sx={{ mb: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      {renderDashboardContent()}
    </Box>
  );
};

const DashboardOverview = ({ user }: { user: any }) => (
  <Box>
    <Typography variant="body1" color="secondary.main" sx={{ mb: 4 }}>
      Here's an overview of your account and recent activity.
    </Typography>

    <Grid container spacing={3}>
      {/* Quick Stats */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <RequestQuote color="primary" />
              <Box>
                <Typography variant="h6">3</Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Requests
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Schedule color="primary" />
              <Box>
                <Typography variant="h6">2</Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Appointments
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Assignment color="primary" />
              <Box>
                <Typography variant="h6">5</Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Projects
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <RequestQuote />
                </ListItemIcon>
                <ListItemText primary="New estimate request submitted" secondary="Kitchen renovation - 2 hours ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary="Appointment scheduled" secondary="Site visit - Tomorrow at 2:00 PM" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Estimate received" secondary="Bathroom remodel - 1 day ago" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Account Info */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body1">{new Date(user.createdOn).toLocaleDateString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Default Service Address
                </Typography>
                <Typography variant="body1">
                  {user.serviceAddresses?.find((addr: any) => addr.isDefault)?.street || 'Not set'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Communication Preference
                </Typography>
                <Typography variant="body1">{user.communicationPreferences?.email ? 'Email' : 'Phone'}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const EstimateRequestsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      My Estimate Requests
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your estimate requests will appear here. This would typically fetch from a 'estimateRequests' collection.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const AppointmentsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      My Appointments
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your scheduled appointments will appear here. This would typically fetch from an 'appointments' collection.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const ClientDashboard = () => {
  return <ClientDashboardContent />;
};

export default ClientDashboard;
