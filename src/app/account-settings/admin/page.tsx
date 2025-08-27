'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Tabs, Tab, LinearProgress, Alert } from '@mui/material';
import { Person, Home, Notifications, Security, Business, Settings, AdminPanelSettings } from '@mui/icons-material';
import useUser from '@/hooks/auth/useUser';
import { AdminRoute } from '@/components/auth/RouteGuard/RouteGuard';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { ServiceAddressManager } from '@/components/profile/ServiceAddressManager/ServiceAddressManager';
import { CommunicationPreferences } from '@/components/profile/CommunicationPreferences/CommunicationPreferences';

/**
 * Admin Account Settings Page
 * Provides access to profile management and administrative settings
 */
const AdminAccountSettingsPage = () => {
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
                Administrative Settings
              </Typography>
              <Alert severity="info">
                Administrative settings such as company configuration, user management preferences, and system-wide
                settings will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Company profile management</li>
                <li>Default user role settings</li>
                <li>System-wide notification preferences</li>
                <li>Business hours configuration</li>
                <li>Service area management</li>
                <li>Pricing and service configuration</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Configuration
              </Typography>
              <Alert severity="info">
                System configuration including database settings, API configurations, and integration management will be
                available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Email and SMS provider settings</li>
                <li>Payment gateway configuration</li>
                <li>Third-party integrations</li>
                <li>Backup and maintenance schedules</li>
                <li>Security policies</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Preferences
              </Typography>
              <Alert severity="info">
                Administrative system preferences such as dashboard customization, reporting preferences, and workflow
                settings will be available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Security
              </Typography>
              <Alert severity="info">
                Enhanced security settings such as password policies, two-factor authentication, session management, and
                audit logs will be available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <AdminRoute>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Admin Account Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your administrative profile, system configuration, and company settings.
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="admin settings tabs">
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Home />} label="Addresses" />
              <Tab icon={<Notifications />} label="Communications" />
              <Tab icon={<AdminPanelSettings />} label="Admin Settings" />
              <Tab icon={<Business />} label="System Config" />
              <Tab icon={<Settings />} label="Preferences" />
              <Tab icon={<Security />} label="Security" />
            </Tabs>
          </Box>
          <CardContent sx={{ p: 3 }}>{renderTabContent()}</CardContent>
        </Card>
      </Box>
    </AdminRoute>
  );
};

export default AdminAccountSettingsPage;
