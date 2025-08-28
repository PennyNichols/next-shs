// Example of how to use the enhanced useImpersonation hook

import React from 'react';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { Box, Typography, Alert } from '@mui/material';

const ExampleComponent: React.FC = () => {
  const { isImpersonating, impersonatedUser, canImpersonate } = useImpersonation();

  if (!canImpersonate) {
    return <Typography>You don't have permission to impersonate users.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Impersonation Status</Typography>

      {isImpersonating && impersonatedUser ? (
        <Alert severity="info">
          <Typography>You are currently impersonating:</Typography>
          <Typography variant="body2">
            <strong>Name:</strong> {impersonatedUser.firstName} {impersonatedUser.lastName}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {impersonatedUser.email}
          </Typography>
          <Typography variant="body2">
            <strong>Role:</strong> {impersonatedUser.role}
          </Typography>
          <Typography variant="body2">
            <strong>User ID:</strong> {impersonatedUser.id}
          </Typography>
        </Alert>
      ) : (
        <Typography>You are acting as yourself.</Typography>
      )}
    </Box>
  );
};

export default ExampleComponent;
