'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { EmployeeRoute } from '@/components/auth/RouteGuard/RouteGuard';

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmployeeRoute>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
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
    </EmployeeRoute>
  );
};

export default EmployeeLayout;
