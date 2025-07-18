'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Grid,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import { Save, Email, Sms, Phone, NotificationsActive, Campaign } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface CommunicationPreferencesData {
  email: boolean;
  sms: boolean;
  phone: boolean;
  push: boolean;
  marketing: boolean;
  serviceReminders: boolean;
  estimateUpdates: boolean;
  promotions: boolean;
}

interface CommunicationPreferencesProps {
  userId: string;
  preferences?: CommunicationPreferencesData;
  isAdminView?: boolean;
}

export const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({
  userId,
  preferences,
  isAdminView = false,
}) => {
  const [prefs, setPrefs] = useState<CommunicationPreferencesData>({
    email: preferences?.email ?? true,
    sms: preferences?.sms ?? false,
    phone: preferences?.phone ?? true,
    push: preferences?.push ?? true,
    marketing: preferences?.marketing ?? false,
    serviceReminders: preferences?.serviceReminders ?? true,
    estimateUpdates: preferences?.estimateUpdates ?? true,
    promotions: preferences?.promotions ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePreferenceChange = (key: keyof CommunicationPreferencesData) => {
    setPrefs(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateDoc(doc(db, 'users', userId), {
        communicationPreferences: prefs,
        updatedOn: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  const PreferenceGroup = ({ 
    title, 
    icon, 
    children 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    children: React.ReactNode 
  }) => (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Box>
      {children}
    </Box>
  );

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Communication Preferences</Typography>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Communication preferences updated successfully!
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <PreferenceGroup 
              title="Communication Methods" 
              icon={<NotificationsActive color="primary" />}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.email}
                      onChange={() => handlePreferenceChange('email')}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Email fontSize="small" />
                      Email Notifications
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.sms}
                      onChange={() => handlePreferenceChange('sms')}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Sms fontSize="small" />
                      SMS/Text Messages
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.phone}
                      onChange={() => handlePreferenceChange('phone')}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Phone fontSize="small" />
                      Phone Calls
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.push}
                      onChange={() => handlePreferenceChange('push')}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <NotificationsActive fontSize="small" />
                      Push Notifications
                    </Box>
                  }
                />
              </Box>
            </PreferenceGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <PreferenceGroup 
              title="Content Types" 
              icon={<Campaign color="primary" />}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.serviceReminders}
                      onChange={() => handlePreferenceChange('serviceReminders')}
                    />
                  }
                  label="Service Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.estimateUpdates}
                      onChange={() => handlePreferenceChange('estimateUpdates')}
                    />
                  }
                  label="Estimate Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                    />
                  }
                  label="Marketing Communications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={prefs.promotions}
                      onChange={() => handlePreferenceChange('promotions')}
                    />
                  }
                  label="Promotions & Offers"
                />
              </Box>
            </PreferenceGroup>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> You can change these preferences at any time. 
            Service reminders and estimate updates are recommended to stay informed about your projects.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
