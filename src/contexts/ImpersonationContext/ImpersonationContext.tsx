'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import useUser from '@/hooks/auth/useUser';
import { hasRolePermission } from '@/lib/utils/roleUtils';

interface ImpersonationContextType {
  impersonatedUserId: string | null;
  impersonatedUser: any | null;
  setImpersonatedUserId: (userId: string | null) => void;
  isImpersonating: boolean;
  canImpersonate: boolean;
  canImpersonateUser: (targetUserRole: string) => boolean;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

interface ImpersonationProviderProps {
  children: ReactNode;
}

export const ImpersonationProvider: React.FC<ImpersonationProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const { user: currentUserData } = useUser();
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);
  const [impersonatedUser, setImpersonatedUser] = useState<any | null>(null);

  // Check if current user can impersonate (admin or super)
  // Use role from Firebase Auth custom claims
  const canImpersonate = currentUser?.role === 'super' || currentUser?.role === 'admin';
  
  console.log('ImpersonationContext - currentUser?.role:', currentUser?.role);
  console.log('ImpersonationContext - canImpersonate:', canImpersonate);

  // Check if current user can impersonate a specific user role
  const canImpersonateUser = (targetUserRole: string) => {
    if (!canImpersonate) return false;
    
    // Super users can impersonate anyone
    if (currentUser?.role === 'super') return true;
    
    // Admin users cannot impersonate super users
    if (currentUser?.role === 'admin' && targetUserRole === 'super') return false;
    
    // Admin users can impersonate admin, employee, contractor, client
    return ['admin', 'employee', 'contractor', 'client'].includes(targetUserRole);
  };

  const handleSetImpersonatedUserId = (userId: string | null) => {
    setImpersonatedUserId(userId);
    // You would fetch the impersonated user data here
    // For now, we'll set it to null when not impersonating
    setImpersonatedUser(userId ? { id: userId } : null);
  };

  const value: ImpersonationContextType = {
    impersonatedUserId,
    impersonatedUser,
    setImpersonatedUserId: handleSetImpersonatedUserId,
    isImpersonating: !!impersonatedUserId,
    canImpersonate,
    canImpersonateUser,
  };

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
};

export const useImpersonation = (): ImpersonationContextType => {
  const context = useContext(ImpersonationContext);
  if (context === undefined) {
    throw new Error('useImpersonation must be used within an ImpersonationProvider');
  }
  return context;
};
