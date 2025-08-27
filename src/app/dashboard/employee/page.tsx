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
import { Person, Home, Business, Assignment, Schedule, People } from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { EmployeeRoute } from '@/components/auth/RouteGuard/RouteGuard';
import useUser from '@/hooks/auth/useUser';

const EmployeeDashboardContent = () => {
  const { user, loading } = useUser();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'tasks' | 'clients'>(
    'dashboard',
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading employee dashboard...
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
      case 'tasks':
        return <TasksView />;
      case 'clients':
        return <ClientsView />;
      default:
        return <EmployeeDashboardOverview user={user} />;
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
          Employee Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <Home /> },
            { key: 'profile', label: 'My Profile', icon: <Person /> },
            { key: 'tasks', label: 'My Tasks', icon: <Assignment /> },
            { key: 'clients', label: 'Client Management', icon: <People /> },
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

const EmployeeDashboardOverview = ({ user }: { user: any }) => (
  <Box>
    <Typography variant="body1" color="secondary.main" sx={{ mb: 4 }}>
      Here's an overview of your work and responsibilities.
    </Typography>

    <Grid container spacing={3}>
      {/* Quick Stats */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Assignment color="primary" />
              <Box>
                <Typography variant="h6">8</Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Tasks
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
              <People color="primary" />
              <Box>
                <Typography variant="h6">12</Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Clients
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
                <Typography variant="h6">4</Typography>
                <Typography variant="body2" color="text.secondary">
                  Today's Meetings
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
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Task completed" secondary="Client follow-up call - 30 minutes ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="New client assigned" secondary="Sarah Johnson - 2 hours ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary="Meeting scheduled" secondary="Team standup - Tomorrow at 9:00 AM" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Work Summary */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Work Summary
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1">Customer Service</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tasks Completed This Week
                </Typography>
                <Typography variant="h6">24</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Performance Rating
                </Typography>
                <Typography variant="h6">Excellent</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const TasksView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      My Tasks
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your assigned tasks will appear here. This would typically fetch from a 'tasks' or 'assignments' collection.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const ClientsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Client Management
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Your assigned clients will appear here. This would typically fetch from a 'clients' collection with proper filtering.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const EmployeeDashboardPage = () => {
  return (
    <EmployeeRoute>
      <EmployeeDashboardContent />
    </EmployeeRoute>
  );
};

export default EmployeeDashboardPage;
