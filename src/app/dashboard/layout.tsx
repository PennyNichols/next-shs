'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { DashboardNavigation } from '@/components/layout/NavBar';
import { AuthRoute } from '@/components/auth/RouteGuard/RouteGuard';
import ActOnBehalfSelector from '@/components/ActOnBehalfSelector';
import PageContainer from '@/components/common/PageContainer/PageContainer';

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
      <PageContainer>{children}</PageContainer>
    </AuthRoute>
  );
}
