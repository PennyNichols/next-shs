# Role-Based Dashboard Routing Implementation

## Overview

This implementation provides automatic role-based routing for users after authentication. When users sign in or sign up, they are automatically redirected to their appropriate dashboard based on their assigned role/type.

## Supported User Roles

The system supports the following user roles with their corresponding dashboard routes:

| Role         | Dashboard Route         | Description                              |
| ------------ | ----------------------- | ---------------------------------------- |
| `client`     | `/client/dashboard`     | Regular customers and service recipients |
| `employee`   | `/employee/dashboard`   | Company employees and field workers      |
| `contractor` | `/contractor/dashboard` | External contractors and subcontractors  |
| `admin`      | `/admin/dashboard`      | System administrators                    |
| `super`      | `/admin/dashboard`      | Super administrators (same as admin)     |

## Implementation Details

### 1. Role-Based Routing Utility (`src/lib/utils/roleBasedRouting.ts`)

This utility provides functions to:

- Map user roles to dashboard routes
- Get appropriate dashboard URLs for users
- Validate dashboard routes
- Provide fallback routing for unknown roles

Key functions:

- `getDashboardRouteForRole(userType)` - Returns the dashboard route for a given role
- `getDashboardRouteForUser(user)` - Returns the dashboard route for a user object
- `getAllDashboardRoutes()` - Returns all available dashboard routes
- `isValidDashboardRoute(route)` - Validates if a route is a valid dashboard route

### 2. Updated AuthContext (`src/contexts/AuthContext/AuthContext.tsx`)

The authentication context has been enhanced to:

- Fetch user role information from Firestore during sign-in
- Route users to their appropriate dashboard after authentication
- Handle both `type` and `role` fields for backward compatibility
- Provide fallback routing if user data is not found

Key changes:

- `signIn()` function now fetches user data and routes based on role
- `signUp()` function creates user with default client role and routes appropriately
- Both functions use the role-based routing utility for consistent routing

### 3. Route Guards (`src/components/auth/RouteGuard/RouteGuard.tsx`)

Enhanced route protection with role-based access control:

- `AdminRoute` - Allows admin and super users
- `EmployeeRoute` - Allows employee, admin, and super users
- `ContractorRoute` - Allows contractor, admin, and super users
- `StaffRoute` - Allows admin, super, and employee users
- `ClientRoute` - Allows client, admin, super, and employee users
- `AuthRoute` - Requires any authenticated user

The route guard now redirects users to their appropriate dashboard when access is denied.

### 4. Dashboard Pages

Created dashboard pages for all supported roles:

#### Client Dashboard (`src/app/(main)/client/dashboard/page.tsx`)

- Already existed - no changes needed

#### Admin Dashboard (`src/app/(main)/admin/dashboard/page.tsx`)

- Already existed - no changes needed

#### Employee Dashboard (`src/app/(main)/employee/dashboard/page.tsx`)

- **NEW** - Created placeholder dashboard for employees
- Features: Job management, scheduling, time tracking, client info, reports, resources

#### Contractor Dashboard (`src/app/(main)/contractor/dashboard/page.tsx`)

- **NEW** - Created placeholder dashboard for contractors
- Features: Project management, bidding, invoicing, materials, client communication, documentation

### 5. Navigation Updates (`src/components/layout/NavBar/NavBar.tsx`)

Updated navigation to support all user roles:

- Added contractor role to dashboard URL logic
- Added super role support (routes to admin dashboard)
- Maintains backward compatibility with existing roles

## How It Works

### Sign-In Flow

1. User enters credentials and submits sign-in form
2. `signIn()` function authenticates with Firebase Auth
3. Function fetches user document from Firestore using the user's UID
4. Extracts user's `type` or `role` field (defaults to 'client' if not found)
5. Uses `getDashboardRouteForRole()` to determine appropriate dashboard
6. Redirects user to their role-specific dashboard

### Sign-Up Flow

1. User completes registration form
2. `signUp()` function creates Firebase Auth account
3. Function creates user document in Firestore with default 'client' role
4. Uses `getDashboardRouteForRole()` to get client dashboard route
5. Redirects new user to client dashboard

### Route Protection

1. Protected routes use role-specific route guards
2. Route guards check user authentication and role permissions
3. If access denied, user is redirected to their appropriate dashboard
4. Unknown or missing roles default to client dashboard

## Testing the Implementation

### Manual Testing

1. **Create test users with different roles**:
   - Sign up normally (creates client user)
   - Use Firebase Console to manually change user `type` field
   - Or use the provided test utility functions

2. **Test role switching**:

   ```javascript
   // In browser console (development mode)
   testRoleBasedRouting.logAvailableRoles();
   testRoleBasedRouting.testRoleSwitching('admin');
   ```

3. **Verify routing**:
   - Sign out and sign back in
   - Confirm redirect to correct dashboard
   - Test access to different protected routes

### Test Utility (`src/lib/utils/testRoleBasedRouting.ts`)

Provides development utilities for testing:

- `updateUserRoleForTesting()` - Change user role in Firestore
- `getUserRoleInfo()` - Get current user role and dashboard info
- `logAvailableRoles()` - Display all available roles
- `testRoleSwitching()` - Quick role switching for current user

## Security Considerations

1. **Role Assignment**: Only super users should be able to change user roles in production
2. **Route Protection**: All sensitive routes are protected with appropriate role guards
3. **Fallback Security**: Unknown roles default to client permissions (least privilege)
4. **Firestore Rules**: Database rules enforce role-based access control
5. **Client-Side**: Routing is primarily for UX; server-side validation still required

## Future Enhancements

1. **Dynamic Role Management**: Admin interface for role assignment
2. **Multi-Role Support**: Users with multiple roles
3. **Temporary Role Switching**: Admin impersonation capabilities
4. **Role Hierarchies**: More complex role inheritance
5. **Dashboard Customization**: Role-based dashboard configuration
6. **Audit Logging**: Track role changes and access patterns

## File Structure

```
src/
├── lib/utils/
│   ├── roleBasedRouting.ts           # Core routing utility
│   └── testRoleBasedRouting.ts       # Testing utilities
├── contexts/AuthContext/
│   └── AuthContext.tsx               # Enhanced authentication
├── components/auth/RouteGuard/
│   └── RouteGuard.tsx               # Role-based route protection
├── app/(main)/
│   ├── client/dashboard/page.tsx     # Client dashboard
│   ├── admin/dashboard/page.tsx      # Admin dashboard
│   ├── employee/dashboard/page.tsx   # Employee dashboard (NEW)
│   └── contractor/dashboard/page.tsx # Contractor dashboard (NEW)
└── components/layout/NavBar/
    └── NavBar.tsx                   # Updated navigation
```

## Usage Examples

### Basic Role Checking

```typescript
import { getDashboardRouteForRole } from '@/lib/utils/roleBasedRouting';

const dashboardUrl = getDashboardRouteForRole(user.type);
router.push(dashboardUrl);
```

### Route Protection

```typescript
import { AdminRoute, EmployeeRoute } from '@/components/auth/RouteGuard/RouteGuard';

// Admin-only content
<AdminRoute>
  <AdminOnlyComponent />
</AdminRoute>

// Employee and above
<EmployeeRoute>
  <EmployeeComponent />
</EmployeeRoute>
```

### Testing Role Changes

```javascript
// In browser console (development)
testRoleBasedRouting.updateUserRole('user-id', 'admin').then(() => console.log('Role updated successfully'));
```
