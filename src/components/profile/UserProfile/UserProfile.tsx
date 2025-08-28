'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid, Chip, IconButton, Divider, Alert } from '@mui/material';
import { Edit, Email, Phone, Home, Person } from '@mui/icons-material';
import useUser from '@/hooks/auth/useUser';
import { UserProfileEdit } from '../UserProfileEdit/UserProfileEdit';
import { ServiceAddressManager } from '../ServiceAddressManager/ServiceAddressManager';
import { CommunicationPreferences } from '../CommunicationPreferences/CommunicationPreferences';
import { UserNotes } from '../UserNotes/UserNotes';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

interface UserProfileProps {
  userId?: string; // Optional: if provided, shows profile for specific user (admin view)
  isAdminView?: boolean; // If true, shows admin-specific features
  refreshUser?: () => void | Promise<void>; // Optional callback to refresh user data
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  isAdminView = false,
  refreshUser: externalRefreshUser,
}) => {
  const { user: currentUser, refreshUser: internalRefreshUser } = useUser();
  const { currentUser: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'preferences' | 'notes'>('profile');

  // Use external refreshUser if provided, otherwise use internal one
  const refreshUser = externalRefreshUser || internalRefreshUser;

  // For admin view, you'd fetch user by userId instead of using currentUser
  const displayUser = currentUser; // In a real implementation, fetch user by userId if provided

  if (!displayUser) {
    return <Alert severity="warning">User profile not found or still loading.</Alert>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'disabled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'admin':
        return 'error';
      case 'employee':
        return 'warning';
      case 'contractor':
        return 'info';
      case 'client':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={displayUser.profilePictureURL} sx={{ width: 80, height: 80 }}>
                  {displayUser.first?.[0]}
                  {displayUser.last?.[0]}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h4" gutterBottom>
                    {displayUser.first} {displayUser.last}
                  </Typography>
                  <Box display="flex" gap={1} mb={1}>
                    <Chip label={displayUser.role} color={getTypeColor(displayUser.role)} size="small" />
                    <Chip label={displayUser.status} color={getStatusColor(displayUser.status)} size="small" />
                    {displayUser.emailVerified && <Chip label="Email Verified" color="success" size="small" />}
                  </Box>
                  <Box display="flex" alignItems="center" gap={2} color="text.secondary">
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Email fontSize="small" />
                      <Typography variant="body2">{displayUser.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Phone fontSize="small" />
                      <Typography variant="body2">{displayUser.phone}</Typography>
                    </Box>
                  </Box>
                </Box>
                {(isAdminView || authUser?.uid === displayUser.id) && (
                  <IconButton onClick={() => setIsEditing(true)} color="primary">
                    <Edit />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Navigation Tabs */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" gap={2}>
                {['profile', 'addresses', 'preferences', 'notes'].map((tab) => (
                  <Chip
                    key={tab}
                    label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                    onClick={() => setActiveTab(tab as any)}
                    color={activeTab === tab ? 'primary' : 'default'}
                    variant={activeTab === tab ? 'filled' : 'outlined'}
                    clickable
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Area */}
        <Grid item xs={12}>
          {activeTab === 'profile' && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Primary Address
                    </Typography>
                    {displayUser.primaryAddress ? (
                      <Typography variant="body1">
                        {displayUser.primaryAddress.street}
                        <br />
                        {displayUser.primaryAddress.city}, {displayUser.primaryAddress.state}{' '}
                        {displayUser.primaryAddress.zipCode}
                        <br />
                        {displayUser.primaryAddress.country}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No primary address set
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Account Information
                    </Typography>
                    <Typography variant="body1">
                      Created: {new Date(displayUser.createdOn).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Last Updated: {new Date(displayUser.updatedOn).toLocaleDateString()}
                    </Typography>
                    {displayUser.activeOn && (
                      <Typography variant="body1">
                        Last Active: {new Date(displayUser.activeOn).toLocaleDateString()}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 'addresses' && (
            <ServiceAddressManager
              userId={displayUser.id}
              addresses={(displayUser.serviceAddresses || []).map((addr) => ({
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
              isAdminView={isAdminView}
            />
          )}

          {activeTab === 'preferences' && (
            <CommunicationPreferences
              userId={displayUser.id}
              preferences={displayUser.communicationPreferences}
              isAdminView={isAdminView}
            />
          )}

          {activeTab === 'notes' && (
            <UserNotes userId={displayUser.id} notes={displayUser.notes || []} isAdminView={isAdminView} />
          )}
        </Grid>
      </Grid>

      {/* Edit Modal */}
      {isEditing && (
        <UserProfileEdit
          user={displayUser}
          open={isEditing}
          onClose={() => setIsEditing(false)}
          onUpdate={refreshUser}
          isAdminView={isAdminView}
        />
      )}
    </Box>
  );
};
