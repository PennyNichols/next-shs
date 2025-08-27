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
  Alert,
} from '@mui/material';
import { 
  Person, 
  Home, 
  SupervisorAccount, 
  Security, 
  Storage, 
  Settings,
  Analytics,
  People,
  Business,
  AdminPanelSettings 
} from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { SuperOnly } from '@/components/common/RoleGuard/RoleGuard';
import useUserWithImpersonation from '@/hooks/auth/useUserWithImpersonation';

const SuperAdminDashboardContent = () => {
  const { user, loading, isImpersonating, targetUserId } = useUserWithImpersonation();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'system' | 'users' | 'security'>(
    'dashboard',
  );
  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading super admin dashboard...
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
      case 'system':
        return <SystemManagementView />;
      case 'users':
        return <GlobalUserManagementView />;
      case 'security':
        return <SecurityManagementView />;
      default:
        return <SuperAdminDashboardOverview user={user} />;
    }
  };

  return (
    <Box>
      {/* Section Navigation */}
      <Box sx={{ mb: 3, p: 3 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Super Administrator Access:</strong> You have full system control. Use these powers responsibly.
        </Alert>
        {isImpersonating && (
          <Alert severity="info" sx={{ mb: 3 }} icon={<AdminPanelSettings />}>
            Acting on behalf of: {user.first} {user.last} ({user.email})
          </Alert>
        )}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome back, {user.first}!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
          Super Administrator Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <Home /> },
            { key: 'profile', label: 'My Profile', icon: <Person /> },
            { key: 'system', label: 'System Management', icon: <Storage /> },
            { key: 'users', label: 'Global User Management', icon: <People /> },
            { key: 'security', label: 'Security Center', icon: <Security /> },
          ].map((item) => (
            <Button
              key={item.key}
              variant={activeSection === item.key ? 'contained' : 'outlined'}
              onClick={() => setActiveSection(item.key as any)}
              startIcon={item.icon}
              sx={{ mb: 1 }}
              color={item.key === 'security' ? 'error' : 'primary'}
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

const SuperAdminDashboardOverview = ({ user }: { user: any }) => (
  <Box>
    <Typography variant="body1" color="secondary.main" sx={{ mb: 4 }}>
      Here's a complete overview of the entire system.
    </Typography>

    <Grid container spacing={3}>
      {/* System Stats */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Storage color="primary" />
              <Box>
                <Typography variant="h6">99.9%</Typography>
                <Typography variant="body2" color="text.secondary">
                  System Uptime
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <People color="primary" />
              <Box>
                <Typography variant="h6">2,456</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Business color="primary" />
              <Box>
                <Typography variant="h6">15</Typography>
                <Typography variant="body2" color="text.secondary">
                  Organizations
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Security color="error" />
              <Box>
                <Typography variant="h6">0</Typography>
                <Typography variant="body2" color="text.secondary">
                  Security Alerts
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* System Activity */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText primary="Database backup completed" secondary="Auto-backup successful - 2 hours ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="New organization registered" secondary="ABC Construction LLC - 4 hours ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText primary="Security scan completed" secondary="No vulnerabilities found - 6 hours ago" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* System Health */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Health
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Database Performance
                </Typography>
                <Typography variant="h6" color="success.main">Excellent</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  API Response Time
                </Typography>
                <Typography variant="h6">45ms</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Storage Usage
                </Typography>
                <Typography variant="h6">67%</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const SystemManagementView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      System Management
    </Typography>
    <Alert severity="info" sx={{ mb: 3 }}>
      System management tools including database administration, server configuration, and infrastructure monitoring will be available soon.
    </Alert>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Advanced system management features coming soon:
        </Typography>
        <ul>
          <li>Database backup and restore</li>
          <li>Server performance monitoring</li>
          <li>Infrastructure scaling controls</li>
          <li>Feature flag management</li>
          <li>Environment configuration</li>
        </ul>
      </CardContent>
    </Card>
  </Box>
);

const GlobalUserManagementView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Global User Management
    </Typography>
    <Alert severity="info" sx={{ mb: 3 }}>
      Global user management across all organizations and advanced role administration will be available soon.
    </Alert>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Global user management features coming soon:
        </Typography>
        <ul>
          <li>Cross-organization user search</li>
          <li>Bulk user operations</li>
          <li>Advanced role assignment</li>
          <li>User lifecycle management</li>
          <li>Audit trail and compliance</li>
        </ul>
      </CardContent>
    </Card>
  </Box>
);

const SecurityManagementView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Security Management Center
    </Typography>
    <Alert severity="warning" sx={{ mb: 3 }}>
      <strong>Critical Security Controls:</strong> Changes here affect system-wide security policies.
    </Alert>
    <Alert severity="info" sx={{ mb: 3 }}>
      Advanced security management tools will be available soon.
    </Alert>
    <Card>
      <CardContent>
        <Typography variant="body1">
          Security management features coming soon:
        </Typography>
        <ul>
          <li>Security policy management</li>
          <li>Threat detection and monitoring</li>
          <li>Incident response tools</li>
          <li>Compliance reporting</li>
          <li>Encryption key management</li>
          <li>Access audit logs</li>
        </ul>
      </CardContent>
    </Card>
  </Box>
);

const SuperAdminDashboardPage = () => {
  return (
    <SuperOnly>
      <SuperAdminDashboardContent />
    </SuperOnly>
  );
};

export default SuperAdminDashboardPage;
