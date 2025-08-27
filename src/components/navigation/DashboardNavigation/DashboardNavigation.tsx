'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import { AccountCircle, Dashboard } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import { getDashboardRouteForRole, ROLE_DASHBOARD_ROUTES } from '@/lib/utils/roleBasedRouting';
import { getRoleDisplayName, hasRolePermission } from '@/lib/utils/roleUtils';

export const DashboardNavigation: React.FC = () => {
  const { currentUser, signOutUser } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dashboardMenuEl, setDashboardMenuEl] = React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDashboardMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDashboardMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setDashboardMenuEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
    handleMenuClose();
  };

  const navigateToDashboard = (role: string) => {
    const dashboardRoute = getDashboardRouteForRole(role);
    router.push(dashboardRoute);
    handleMenuClose();
  };

  // Get dashboards the current user can access
  const getAccessibleDashboards = () => {
    if (!currentUser?.role) return [];

    return Object.entries(ROLE_DASHBOARD_ROUTES).filter(([role]) => {
      // User can access their own dashboard and any lower-level dashboards
      return hasRolePermission(currentUser.role!, role as any);
    });
  };

  const accessibleDashboards = getAccessibleDashboards();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SHS Florida - {currentUser?.role ? getRoleDisplayName(currentUser.role) : 'User'} Dashboard
        </Typography>

        {/* Current Role Display */}
        {currentUser?.role && (
          <Chip
            label={getRoleDisplayName(currentUser.role)}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              mr: 2,
            }}
          />
        )}

        {/* Dashboard Menu */}
        {accessibleDashboards.length > 1 && (
          <Box sx={{ mr: 2 }}>
            <IconButton color="inherit" onClick={handleDashboardMenuOpen} title="Switch Dashboard">
              <Dashboard />
            </IconButton>
            <Menu
              anchorEl={dashboardMenuEl}
              open={Boolean(dashboardMenuEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  Available Dashboards
                </Typography>
              </MenuItem>
              <Divider />
              {accessibleDashboards.map(([role, route]) => (
                <MenuItem
                  key={role}
                  onClick={() => navigateToDashboard(role)}
                  selected={window.location.pathname === route}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={getRoleDisplayName(role as any)}
                      size="small"
                      color={currentUser?.role === role ? 'primary' : 'default'}
                    />
                    <Typography variant="body2">Dashboard</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* User Menu */}
        <IconButton size="large" edge="end" color="inherit" onClick={handleUserMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              router.push('/role-test');
              handleMenuClose();
            }}
          >
            Role Test Page
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/profile');
              handleMenuClose();
            }}
          >
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
