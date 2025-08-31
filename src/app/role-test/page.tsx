'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Divider } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { RoleGuard, AdminOnly, SuperOnly, EmployeeOrHigher, ContractorOrHigher } from '@/components/common/RoleGuard';
import {
  hasRolePermission,
  isAdmin,
  isSuper,
  getAssignableRoles,
  getRoleDisplayName,
  UserRole,
  ROLE_HIERARCHY,
} from '@/lib/utils/roleUtils';
import { DashboardNavigation } from '@/components/layout/NavBar';
import useUser from '@/hooks/auth/useUser';

export default function RoleTestPage() {
  const { currentUser } = useAuth();
  const { user } = useUser();
  const { setUserRole } = useAdmin();

  const handleSetRole = async (role: UserRole) => {
    if (user?.id) {
      try {
        await setUserRole(user.id, role);
        console.log(`Successfully set role to ${role}`);
      } catch (error) {
        console.error('Failed to set role:', error);
      }
    }
  };

  const currentRole = currentUser?.role;
  const assignableRoles = currentRole ? getAssignableRoles(currentRole) : [];

  return (
    <Box>
      <DashboardNavigation />
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Role System Test Page
        </Typography>

        {/* Current User Info */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Current User Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Email:</strong> {currentUser?.email || 'Not logged in'}
                </Typography>
                <Typography>
                  <strong>Current Role:</strong> {currentRole ? getRoleDisplayName(currentRole) : 'No role assigned'}
                </Typography>
                <Typography>
                  <strong>Is Admin:</strong> {currentRole ? (isAdmin(currentRole) ? 'Yes' : 'No') : 'No'}
                </Typography>
                <Typography>
                  <strong>Is Super Admin:</strong> {currentRole ? (isSuper(currentRole) ? 'Yes' : 'No') : 'No'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 1 }}>
                  <strong>Role Hierarchy Permissions:</strong>
                </Typography>
                {Object.keys(ROLE_HIERARCHY).map((role) => (
                  <Chip
                    key={role}
                    label={`${getRoleDisplayName(role as UserRole)}: ${currentRole && hasRolePermission(currentRole, role as UserRole) ? '✓' : '✗'}`}
                    color={currentRole && hasRolePermission(currentRole, role as UserRole) ? 'success' : 'default'}
                    variant={currentRole && hasRolePermission(currentRole, role as UserRole) ? 'filled' : 'outlined'}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Role Assignment */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Role Assignment
            </Typography>
            {assignableRoles.length > 0 ? (
              <>
                <Typography sx={{ mb: 2 }}>You can assign the following roles:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {assignableRoles.map((role) => (
                    <Button
                      key={role}
                      variant={currentRole === role ? 'contained' : 'outlined'}
                      color={
                        role === 'super'
                          ? 'error'
                          : role === 'admin'
                            ? 'primary'
                            : role === 'employee'
                              ? 'secondary'
                              : role === 'contractor'
                                ? 'warning'
                                : 'info'
                      }
                      onClick={() => handleSetRole(role)}
                    >
                      {getRoleDisplayName(role)}
                    </Button>
                  ))}
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">You don't have permission to assign roles.</Typography>
            )}
          </CardContent>
        </Card>

        {/* Role-Based Content Examples */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Role-Based Content Examples
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
              Super Admin Only Content:
            </Typography>
            <SuperOnly showError>
              <Card sx={{ bgcolor: 'error.light', color: 'error.contrastText', mb: 2 }}>
                <CardContent>
                  <Typography>🔴 This content is only visible to Super Admins!</Typography>
                  <Typography variant="body2">
                    Super admins have the highest level of access and can manage all aspects of the system.
                  </Typography>
                </CardContent>
              </Card>
            </SuperOnly>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Admin Level Content:
            </Typography>
            <AdminOnly showError>
              <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', mb: 2 }}>
                <CardContent>
                  <Typography>🔵 This content is visible to Admins and Super Admins!</Typography>
                  <Typography variant="body2">Admin level users can manage users and most system settings.</Typography>
                </CardContent>
              </Card>
            </AdminOnly>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Employee or Higher Content:
            </Typography>
            <EmployeeOrHigher showError>
              <Card sx={{ bgcolor: 'secondary.light', color: 'secondary.contrastText', mb: 2 }}>
                <CardContent>
                  <Typography>🟣 This content is visible to Employees, Admins, and Super Admins!</Typography>
                  <Typography variant="body2">
                    Employee level users can access internal tools and client information.
                  </Typography>
                </CardContent>
              </Card>
            </EmployeeOrHigher>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Contractor or Higher Content:
            </Typography>
            <ContractorOrHigher showError>
              <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText', mb: 2 }}>
                <CardContent>
                  <Typography>🟠 This content is visible to Contractors and above!</Typography>
                  <Typography variant="body2">
                    Contractor level users can access project management tools and submit estimates.
                  </Typography>
                </CardContent>
              </Card>
            </ContractorOrHigher>

            <Typography variant="h6" sx={{ mb: 1 }}>
              All Authenticated Users:
            </Typography>
            <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText', mb: 2 }}>
              <CardContent>
                <Typography>🔵 This content is visible to all logged-in users!</Typography>
                <Typography variant="body2">Basic content that all authenticated users can see.</Typography>
              </CardContent>
            </Card>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Exact Role Match Example:
            </Typography>
            <RoleGuard requiredRole="client" showError>
              <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText', mb: 2 }}>
                <CardContent>
                  <Typography>🟢 This content is ONLY visible to Clients!</Typography>
                  <Typography variant="body2">This uses exact role matching, not hierarchy.</Typography>
                </CardContent>
              </Card>
            </RoleGuard>
          </CardContent>
        </Card>

        {/* Role Hierarchy Information */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Role Hierarchy Information
            </Typography>
            <Typography sx={{ mb: 2 }}>The role hierarchy from highest to lowest permission:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              {Object.entries(ROLE_HIERARCHY)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([role, level], index, array) => (
                  <React.Fragment key={role}>
                    <Chip
                      label={`${getRoleDisplayName(role as UserRole)} (${level})`}
                      color={currentRole === role ? 'primary' : 'default'}
                      variant={currentRole === role ? 'filled' : 'outlined'}
                    />
                    {index < array.length - 1 && <Typography sx={{ mx: 1 }}>→</Typography>}
                  </React.Fragment>
                ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Higher level roles inherit permissions from lower level roles.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
