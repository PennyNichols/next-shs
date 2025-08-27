'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
} from '@mui/material';
import { Person, Home, Notifications, Security, Business, Settings } from '@mui/icons-material';
import useUser from '@/hooks/auth/useUser';
import { EmployeeRoute } from '@/components/auth/RouteGuard/RouteGuard';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { ServiceAddressManager } from '@/components/profile/ServiceAddressManager/ServiceAddressManager';
import { CommunicationPreferences } from '@/components/profile/CommunicationPreferences/CommunicationPreferences';

/**
 * Employee Account Settings Page
 * Provides access to profile management and employee-specific settings
 */
const EmployeeAccountSettingsPage = () => {
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
          <CommunicationPreferences
            userId={user.id}
            preferences={user.communicationPreferences}
            isAdminView={false}
          />
        );
      case 3:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Settings
              </Typography>
              <Alert severity="info">
                Employee-specific settings such as department assignments, shift scheduling, and training records will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Department and role management</li>
                <li>Shift scheduling preferences</li>
                <li>Training and certification tracking</li>
                <li>Performance goal setting</li>
                <li>Time-off requests</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Preferences
              </Typography>
              <Alert severity="info">
                Employee system preferences such as dashboard customization, default views, and workflow settings will be available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Security
              </Typography>
              <Alert severity="info">
                Security settings such as password change, two-factor authentication, and login history will be available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <EmployeeRoute>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Employee Account Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your employee profile, department settings, and system preferences.
      </Typography>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="employee settings tabs">
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Home />} label="Addresses" />
            <Tab icon={<Notifications />} label="Communications" />
            <Tab icon={<Business />} label="Employee Settings" />
            <Tab icon={<Settings />} label="System Preferences" />
            <Tab icon={<Security />} label="Security" />
          </Tabs>
        </Box>
        <CardContent sx={{ p: 3 }}>
          {renderTabContent()}
        </CardContent>
      </Card>
    </Box>
    </EmployeeRoute>
  );
};

export default EmployeeAccountSettingsPage;
