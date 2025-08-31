'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Tabs, Tab, LinearProgress, Alert } from '@mui/material';
import { Person, Home, Notifications, Security, Work } from '@mui/icons-material';
import useUser from '@/hooks/auth/useUser';
import { ContractorRoute } from '@/components/auth/RouteGuard/RouteGuard';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { ServiceAddressManager } from '@/components/profile/ServiceAddressManager/ServiceAddressManager';
import { CommunicationPreferences } from '@/components/profile/CommunicationPreferences/CommunicationPreferences';

/**
 * Contractor Account Settings Page
 * Provides access to profile management, service areas, and contractor-specific settings
 */
const ContractorAccountSettingsPage = () => {
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
                Contractor Settings
              </Typography>
              <Alert severity="info">
                Contractor-specific settings such as service areas, availability, certification management, and
                equipment tracking will be available soon.
              </Alert>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features coming soon:
              </Typography>
              <ul>
                <li>Service area management</li>
                <li>Availability scheduling</li>
                <li>Certification uploads</li>
                <li>Equipment tracking</li>
                <li>Performance metrics</li>
              </ul>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Security
              </Typography>
              <Alert severity="info">
                Security settings such as password change, two-factor authentication, and login history will be
                available soon.
              </Alert>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <ContractorRoute>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Contractor Account Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your contractor profile, service areas, and work preferences.
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="contractor settings tabs">
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Home />} label="Service Areas" />
              <Tab icon={<Notifications />} label="Communications" />
              <Tab icon={<Work />} label="Contractor Settings" />
              <Tab icon={<Security />} label="Security" />
            </Tabs>
          </Box>
          <CardContent sx={{ p: 3 }}>{renderTabContent()}</CardContent>
        </Card>
      </Box>
    </ContractorRoute>
  );
};

export default ContractorAccountSettingsPage;
