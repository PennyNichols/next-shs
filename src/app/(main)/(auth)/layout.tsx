'use client';

import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Extract the auth page type from the pathname
  const getPageTitle = () => {
    if (pathname.includes('sign-in')) return 'Sign In';
    if (pathname.includes('sign-up')) return 'Sign Up';
    if (pathname.includes('forgot-password')) return 'Reset Password';
    if (pathname.includes('verify-email')) return 'Verify Email';
    return 'Authentication';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              {getPageTitle()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              SHS - Home Services Management
            </Typography>
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}

export default AuthLayout;
