'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { useAuth } from './AuthContext/AuthContext';

/**
 * Available user roles (in hierarchical order):
 * - 'super': Super administrator with full system access
 * - 'admin': Administrator with management permissions
 * - 'employee': Internal team member
 * - 'contractor': External contractor/worker
 * - 'client': Customer/client with basic access
 */

interface AdminContextType {
  setUserRole: (uid: string, role: string) => Promise<void>;
  getUserClaims: () => Promise<any>;
  checkUserClaims: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { refreshUserClaims } = useAuth();

    const setUserRole = async (uid: string, role: string) => {
      try {
        console.log(`Setting role for user ${uid} to ${role}`);

        // Import schema manager
        const { updateUserDocumentForRoleChange } = await import('@/lib/schemas/userSchemaManager');

        // First update the user document with complete schema for new role
        await updateUserDocumentForRoleChange(uid, role as any, true);

        // Then set custom claims
        const functions = getFunctions(undefined, 'us-east1');
        const setUserRoleFunction = httpsCallable(functions, 'setUserRole');
        const result = await setUserRoleFunction({ uid, role });
        console.log('Role set successfully:', result.data);

        // Force token refresh to get updated claims
        const auth = getAuth();
        if (auth.currentUser) {
          await auth.currentUser.getIdToken(true); // Force refresh
          const idTokenResult = await auth.currentUser.getIdTokenResult();
          console.log('Updated custom claims:', idTokenResult.claims);

          // Refresh the AuthContext with updated claims
          await refreshUserClaims();
        }

        // Show success message
        alert(`Successfully set role to ${role} for user ${uid}`);
      } catch (error: any) {
        console.error('Error setting user role:', error);
        alert('Error setting user role: ' + error.message);
        throw error;
      }
    };

  const getUserClaims = async (): Promise<any> => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        const idTokenResult = await auth.currentUser.getIdTokenResult();
        return idTokenResult.claims;
      }
      throw new Error('No authenticated user');
    } catch (error) {
      console.error('Error getting claims:', error);
      throw error;
    }
  };

  const checkUserClaims = async (): Promise<void> => {
    try {
      const claims = await getUserClaims();
      console.log('Current user claims:', claims);
      alert(`Current claims: ${JSON.stringify(claims, null, 2)}`);
    } catch (error) {
      console.error('Error checking claims:', error);
      alert('Error checking claims: ' + (error as Error).message);
    }
  };

  const value: AdminContextType = {
    setUserRole,
    getUserClaims,
    checkUserClaims,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
