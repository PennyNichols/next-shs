'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Divider, Chip, Grid } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { DashboardNavigation } from '@/components/layout/NavBar';
import { ROLE_DASHBOARD_ROUTES, getDashboardRouteForRole } from '@/lib/utils/roleBasedRouting';
import { getRoleDisplayName } from '@/lib/utils/roleUtils';

export default function AuthTestPage() {
  const { signIn, signUp, currentUser, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password, firstName, lastName, phoneNumber);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  if (currentUser) {
    return (
      <Box>
        <DashboardNavigation />
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3 }}>
                🎉 Authentication Successful!
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Role-Based Routing Test Results:
              </Typography>
              <Alert severity="success" sx={{ mb: 2 }}>
                You have been automatically routed based on your role!
              </Alert>
              <Box sx={{ mb: 3 }}>
                <Typography>
                  <strong>Email:</strong> {currentUser.email}
                </Typography>
                <Typography>
                  <strong>Role:</strong> {getRoleDisplayName(currentUser.role || 'client')}
                </Typography>
                <Typography>
                  <strong>Expected Dashboard:</strong> {getDashboardRouteForRole(currentUser.role)}
                </Typography>
                <Typography>
                  <strong>Current Path:</strong> {window.location.pathname}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Test Different Roles:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Use the role assignment buttons in the dashboard or role test page to see how the routing changes.
              </Typography>

              <Grid container spacing={2}>
                {Object.entries(ROLE_DASHBOARD_ROUTES).map(([role, route]) => (
                  <Grid item xs={12} sm={6} md={4} key={role}>
                    <Chip
                      label={`${getRoleDisplayName(role as any)} → ${route}`}
                      variant={currentUser.role === role ? 'filled' : 'outlined'}
                      color={currentUser.role === role ? 'primary' : 'default'}
                      sx={{ width: '100%', justifyContent: 'flex-start', p: 1 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            Role-Based Routing Test
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
            Sign in or create an account to test automatic role-based dashboard routing
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            {isSignUp && (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}

            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mb: 2 }}>
              {loading ? 'Processing...' : isSignUp ? 'Sign Up & Test Routing' : 'Sign In & Test Routing'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button fullWidth variant="outlined" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'info.main', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: 'info.contrastText', fontWeight: 'bold' }}>
              Expected Behavior:
            </Typography>
            <Typography variant="body2" sx={{ color: 'info.contrastText' }}>
              • New users → Client Dashboard (/dashboard/client) • Existing users → Role-specific dashboard • Role
              changes → Immediate routing updates
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
