'use client';

import React from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { useImpersonation } from '@/contexts/ImpersonationContext';

const ImpersonationStatus: React.FC = () => {
  const { isImpersonating, canImpersonate, impersonatedUser } = useImpersonation();

  if (!canImpersonate) {
    return null;
  }

  if (isImpersonating && impersonatedUser) {
    const displayName =
      impersonatedUser.firstName && impersonatedUser.lastName
        ? `${impersonatedUser.firstName} ${impersonatedUser.lastName}`
        : impersonatedUser.email;

    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="info" icon={<AdminPanelSettings />}>
          You are currently acting on behalf of <strong>{displayName}</strong> ({impersonatedUser.email}). All actions
          will be performed as that user.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        User impersonation available (currently acting as yourself)
      </Typography>
    </Box>
  );
};

export default ImpersonationStatus;
