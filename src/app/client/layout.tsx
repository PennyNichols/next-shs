'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { ClientRoute } from '@/components/auth/RouteGuard/RouteGuard';
import { DashboardNavigation } from '@/components/navigation/DashboardNavigation/DashboardNavigation';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientRoute>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <DashboardNavigation />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </ClientRoute>
  );
};

export default ClientLayout;
