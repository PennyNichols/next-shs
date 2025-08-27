'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Tabs, Tab, LinearProgress, Alert } from '@mui/material';
import {
  Person,
  Home,
  Notifications,
  Security,
  Business,
  Settings,
  AdminPanelSettings,
  SupervisorAccount,
  Storage,
} from '@mui/icons-material';
import useUser from '@/hooks/auth/useUser';
import { SuperOnly } from '@/components/common/RoleGuard/RoleGuard';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { ServiceAddressManager } from '@/components/profile/ServiceAddressManager/ServiceAddressManager';
import { CommunicationPreferences } from '@/components/profile/CommunicationPreferences/CommunicationPreferences';

/**
 * Super Admin Account Settings Page
 * Provides access to profile management and all system administration settings
 */
const SuperAdminAccountSettingsPage = () => {
  const { user, loading } = useUser();
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <UserProfile />;
      case 1:
        return (
          <ServiceAddressManager
            userId={user.id}
            addresses={(user.serviceAddresses || []).map((addr) => ({
              id: addr.id,
              street: `${addr.street1}${addr.street2 ? ' ' + addr.street2 : ''}`,
              city: addr.city,
              state: addr.state,
              zipCode: addr.zip,
              country: 'US',
              label: addr.label,
              isDefault: addr.isDefault,
              createdOn: addr.createdOn,
            }))}
            isAdminView={false}
          />
        );
      case 2:
        return (
          <CommunicationPreferences userId={user.id} preferences={user.communicationPreferences} isAdminView={false} />
        );
      case 3:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Super Administrative Settings
              </Typography>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <strong>Super Administrator Access:</strong> These settings affect the entire system and all users.
              </Alert>
              <Alert severity="info">
                Super administrative settings such as system architecture, role management, and global configurations
                will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Global role and permission management</li>
                <li>System-wide policy configuration</li>
                <li>Multi-tenant organization setup</li>
                <li>Advanced user lifecycle management</li>
                <li>System monitoring and alerts</li>
                <li>Compliance and audit configurations</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Architecture
              </Typography>
              <Alert severity="info">
                System architecture settings including database management, server configuration, and infrastructure
                monitoring will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Database backup and restore</li>
                <li>Server performance monitoring</li>
                <li>Infrastructure scaling settings</li>
                <li>CDN and caching configuration</li>
                <li>Load balancing management</li>
                <li>Disaster recovery planning</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Configuration
              </Typography>
              <Alert severity="info">
                Advanced system configuration including API management, feature flags, and development/staging
                environments will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Feature flag management</li>
                <li>API rate limiting and security</li>
                <li>Environment configuration</li>
                <li>Third-party service management</li>
                <li>Integration testing tools</li>
                <li>Version control and deployment</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Preferences
              </Typography>
              <Alert severity="info">
                Super administrator system preferences and global default settings will be available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Advanced Security
              </Typography>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <strong>Critical Security Settings:</strong> Changes here affect system-wide security.
              </Alert>
              <Alert severity="info">
                Advanced security settings such as system-wide security policies, encryption management, and security
                monitoring will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>System-wide password policies</li>
                <li>Multi-factor authentication enforcement</li>
                <li>Session management policies</li>
                <li>Security audit and compliance</li>
                <li>Threat detection and response</li>
                <li>Encryption key management</li>
              </ul>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <SuperOnly>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Super Admin Account Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your super administrator profile and control all system-wide settings.
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="super admin settings tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Home />} label="Addresses" />
              <Tab icon={<Notifications />} label="Communications" />
              <Tab icon={<SupervisorAccount />} label="Super Admin" />
              <Tab icon={<Storage />} label="System Architecture" />
              <Tab icon={<Business />} label="System Config" />
              <Tab icon={<Settings />} label="Preferences" />
              <Tab icon={<Security />} label="Security" />
            </Tabs>
          </Box>
          <CardContent sx={{ p: 3 }}>{renderTabContent()}</CardContent>
        </Card>
      </Box>
    </SuperOnly>
  );
};

export default SuperAdminAccountSettingsPage;
