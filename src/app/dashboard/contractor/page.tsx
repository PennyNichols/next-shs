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
import { Person, Home, Work, Assignment, Schedule, Notifications } from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { ContractorRoute } from '@/components/auth/RouteGuard/RouteGuard';
import useUser from '@/hooks/auth/useUser';

const ContractorDashboardContent = () => {
  const { user, loading } = useUser();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'jobs' | 'schedule'>(
    'dashboard',
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading contractor dashboard...
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
      case 'jobs':
        return <JobsView />;
      case 'schedule':
        return <ScheduleView />;
      default:
        return <ContractorDashboardOverview user={user} />;
    }
  };

  return (
    <Box>
      {/* Section Navigation */}
      <Box sx={{ mb: 3, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome back, {user.first}!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Contractor Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <Home /> },
            { key: 'profile', label: 'My Profile', icon: <Person /> },
            { key: 'jobs', label: 'My Jobs', icon: <Work /> },
            { key: 'schedule', label: 'Schedule', icon: <Schedule /> },
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

const ContractorDashboardOverview = ({ user }: { user: any }) => (
  <Box>
    <Typography variant="body1" color="secondary.main" sx={{ mb: 4 }}>
      Here's an overview of your work and assignments.
    </Typography>

    <Grid container spacing={3}>
      {/* Quick Stats */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Work color="primary" />
              <Box>
                <Typography variant="h6">5</Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Jobs
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
                <Typography variant="h6">3</Typography>
                <Typography variant="body2" color="text.secondary">
                  Today's Appointments
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
                <Typography variant="h6">23</Typography>
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
                  <Work />
                </ListItemIcon>
                <ListItemText primary="New job assigned" secondary="Bathroom renovation - 1 hour ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary="Appointment confirmed" secondary="Site visit - Tomorrow at 10:00 AM" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Job completed" secondary="Kitchen tile work - 2 days ago" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Performance Stats */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Rating
                </Typography>
                <Typography variant="h6">4.8/5.0</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  On-Time Completion
                </Typography>
                <Typography variant="h6">96%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  This Month Earnings
                </Typography>
                <Typography variant="h6">$3,250</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const JobsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      My Jobs
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your assigned jobs will appear here. This would typically fetch from a 'jobs' or 'assignments' collection.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const ScheduleView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      My Schedule
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your schedule and appointments will appear here. This would typically fetch from a 'schedule' collection.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const ContractorDashboardPage = () => {
  return (
    <ContractorRoute>
      <ContractorDashboardContent />
    </ContractorRoute>
  );
};

export default ContractorDashboardPage;
