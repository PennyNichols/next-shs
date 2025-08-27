'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { ContractorRoute } from '@/components/auth/RouteGuard/RouteGuard';

const ContractorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContractorRoute>
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
    </ContractorRoute>
  );
};

export default ContractorLayout;
