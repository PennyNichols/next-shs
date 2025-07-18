'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useUser from '@/hooks/auth/useUser';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

export const DashboardNavigation = () => {
  const { user } = useUser();
  const { signOutUser } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigateToDashboard = () => {
    if (user?.type === 'admin' || user?.type === 'employee') {
      router.push('/admin/dashboard');
    } else {
      router.push('/client/dashboard');
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SHS Dashboard
        </Typography>
        
        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">
              Welcome, {user.first} {user.last}
            </Typography>
            <Button
              onClick={handleMenuOpen}
              sx={{ color: 'inherit', textTransform: 'none' }}
            >
              <Avatar
                src={user.profilePictureURL}
                sx={{ width: 32, height: 32, mr: 1 }}
              >
                {user.first?.[0]}{user.last?.[0]}
              </Avatar>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={navigateToDashboard}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => {
                if (user?.type === 'admin' || user?.type === 'employee') {
                  router.push('/admin/dashboard');
                } else {
                  router.push('/client/dashboard');
                }
                handleMenuClose();
              }}>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
