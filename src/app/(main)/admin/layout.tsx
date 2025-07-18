'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { StaffRoute } from '@/components/auth/RouteGuard/RouteGuard';
import { DashboardNavigation } from '@/components/navigation/DashboardNavigation/DashboardNavigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <StaffRoute>
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
    </StaffRoute>
  );
}
