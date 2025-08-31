import React from 'react';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { hasRolePermission, UserRole } from '@/lib/utils/roleUtils';
import { Alert, AlertTitle } from '@mui/material';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: UserRole; // Minimum role level required
  fallback?: React.ReactNode;
  showError?: boolean;
}

/**
 * RoleGuard component that conditionally renders children based on user role permissions
 *
 * @param children - Content to render if permission is granted
 * @param requiredRole - Exact role required (optional)
 * @param requiredPermission - Minimum role level required (uses hierarchy)
 * @param fallback - Custom component to show when permission is denied
 * @param showError - Whether to show default error message when permission denied
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback,
  showError = false,
}) => {
  const { currentUser } = useAuth();

  // If no role requirements, render children
  if (!requiredRole && !requiredPermission) {
    return <>{children}</>;
  }

  // If user has no role, deny access
  if (!currentUser?.role) {
    if (fallback) return <>{fallback}</>;
    if (showError) {
      return (
        <Alert severity="warning">
          <AlertTitle>Access Denied</AlertTitle>
          You must be logged in with appropriate permissions to view this content.
        </Alert>
      );
    }
    return null;
  }

  // Check exact role match
  if (requiredRole && currentUser.role !== requiredRole) {
    if (fallback) return <>{fallback}</>;
    if (showError) {
      return (
        <Alert severity="error">
          <AlertTitle>Insufficient Permissions</AlertTitle>
          This content requires {requiredRole} role access.
        </Alert>
      );
    }
    return null;
  }

  // Check role hierarchy permission
  if (requiredPermission && !hasRolePermission(currentUser.role, requiredPermission)) {
    if (fallback) return <>{fallback}</>;
    if (showError) {
      return (
        <Alert severity="error">
          <AlertTitle>Insufficient Permissions</AlertTitle>
          This content requires {requiredPermission} level access or higher.
        </Alert>
      );
    }
    return null;
  }

  // Permission granted, render children
  return <>{children}</>;
};

// Convenience components for common role checks
export const AdminOnly: React.FC<Omit<RoleGuardProps, 'requiredPermission'>> = (props) => (
  <RoleGuard {...props} requiredPermission="admin" />
);

export const SuperOnly: React.FC<Omit<RoleGuardProps, 'requiredPermission'>> = (props) => (
  <RoleGuard {...props} requiredPermission="super" />
);

export const EmployeeOrHigher: React.FC<Omit<RoleGuardProps, 'requiredPermission'>> = (props) => (
  <RoleGuard {...props} requiredPermission="employee" />
);

export const ContractorOrHigher: React.FC<Omit<RoleGuardProps, 'requiredPermission'>> = (props) => (
  <RoleGuard {...props} requiredPermission="contractor" />
);
