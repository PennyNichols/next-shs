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
  const getPageGreeting = () => {
    if (pathname.includes('sign-in')) return 'Welcome Back!';
    if (pathname.includes('sign-up')) return 'Get Started with SHS Florida!';
    if (pathname.includes('forgot-password')) return "Forgot Your Password? Don't Worry! We Can Help.";
    if (pathname.includes('verify-email')) return 'Last Step!';
    return 'Welcome!';
  };

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 6,
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
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 1,
                fontSize: '2rem',
              }}
            >
              {getPageTitle()}
            </Typography>
            <Typography variant="body2" color="secondary.main" sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
              {getPageGreeting()}
            </Typography>
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
