'use client';

import React from 'react';
import { DashboardNavigation } from '@/components/navigation/DashboardNavigation';
import { AuthRoute } from '@/components/auth/RouteGuard/RouteGuard';

interface AccountSettingsLayoutProps {
  children: React.ReactNode;
}

export default function AccountSettingsLayout({ children }: AccountSettingsLayoutProps) {
  return (
    <AuthRoute>
      <DashboardNavigation />
      {children}
    </AuthRoute>
  );
}
