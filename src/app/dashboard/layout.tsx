'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { DashboardNavigation } from '@/components/navigation/DashboardNavigation';
import { AuthRoute } from '@/components/auth/RouteGuard/RouteGuard';
import ActOnBehalfSelector from '@/components/ActOnBehalfSelector';

// Import migration utilities for development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/schemas/userMigration');
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthRoute>
      <DashboardNavigation />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <ActOnBehalfSelector />
        {children}
      </Container>
    </AuthRoute>
  );
}
