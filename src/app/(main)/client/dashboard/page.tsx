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
  Chip,
  Avatar,
  Divider,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Home,
  RequestQuote,
  Assignment,
  Notifications,
  Settings,
  Schedule,
  Phone,
  Email,
} from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { AuthRoute } from '@/components/auth/RouteGuard/RouteGuard';
import useUser from '@/hooks/auth/useUser';

const ClientDashboardContent = () => {
  const { user, loading } = useUser();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'requests' | 'appointments'>(
    'dashboard',
  );

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

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Home /> },
    { key: 'profile', label: 'My Profile', icon: <Person /> },
    { key: 'requests', label: 'My Requests', icon: <RequestQuote /> },
    { key: 'appointments', label: 'Appointments', icon: <Schedule /> },
  ];

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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 280,
          p: 2,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* User Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Avatar src={user.profilePictureURL} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}>
            {user.first?.[0]}
            {user.last?.[0]}
          </Avatar>
          <Typography variant="h6">
            {user.first} {user.last}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Chip label={user.type} size="small" color="primary" sx={{ mt: 1 }} />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.key}
              button
              selected={activeSection === item.key}
              onClick={() => setActiveSection(item.key as any)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Quick Actions */}
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          Quick Actions
        </Typography>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} startIcon={<RequestQuote />}>
          Request Estimate
        </Button>
        <Button variant="outlined" fullWidth startIcon={<Phone />}>
          Contact Support
        </Button>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>{renderDashboardContent()}</Box>
    </Box>
  );
};

const DashboardOverview = ({ user }: { user: any }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Welcome back, {user.first}!
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
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
  return (
    <AuthRoute>
      <ClientDashboardContent />
    </AuthRoute>
  );
};

export default ClientDashboard;
