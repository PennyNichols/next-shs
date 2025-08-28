'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import useUser from '@/hooks/auth/useUser';
import { hasRolePermission } from '@/lib/utils/roleUtils';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface ImpersonatedUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface ImpersonationContextType {
  impersonatedUserId: string | null;
  impersonatedUser: ImpersonatedUserData | null;
  setImpersonatedUserId: (userId: string | null) => void;
  clearImpersonation: () => void;
  isImpersonating: boolean;
  canImpersonate: boolean;
  canImpersonateUser: (targetUserRole: string) => boolean;
  isHydrated: boolean;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

interface ImpersonationProviderProps {
  children: ReactNode;
}

export const ImpersonationProvider: React.FC<ImpersonationProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const { user: currentUserData } = useUser();
  const [impersonatedUserId, setImpersonatedUserId] = useState<string | null>(null);
  const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check if current user can impersonate (admin or super)
  // Use role from Firebase Auth custom claims
  const canImpersonate = currentUser?.role === 'super' || currentUser?.role === 'admin';

  console.log('ImpersonationContext - currentUser?.role:', currentUser?.role);
  console.log('ImpersonationContext - canImpersonate:', canImpersonate);

  // Initialize impersonation state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('impersonatedUserId');
      if (storedUserId && storedUserId !== 'null') {
        setImpersonatedUserId(storedUserId);
      }
      setIsHydrated(true);
    }
  }, []);

  // Clear impersonation if user loses permission or logs out
  useEffect(() => {
    if (isHydrated && impersonatedUserId && (!canImpersonate || !currentUser)) {
      setImpersonatedUserId(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('impersonatedUserId');
      }
    }
  }, [canImpersonate, impersonatedUserId, isHydrated, currentUser]);

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

  // Fetch impersonated user data when userId changes
  useEffect(() => {
    const fetchImpersonatedUserData = async () => {
      if (!impersonatedUserId) {
        setImpersonatedUser(null);
        return;
      }

      setIsLoadingUser(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', impersonatedUserId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const impersonatedUserData = {
            id: userDoc.id,
            email: userData.email || '',
            firstName: userData.first || userData.firstName || '',
            lastName: userData.last || userData.lastName || '',
            role: userData.role || userData.type || 'client',
          };

          // Verify current user can impersonate this user
          if (canImpersonateUser(impersonatedUserData.role)) {
            setImpersonatedUser(impersonatedUserData);
          } else {
            console.warn('Current user cannot impersonate user with role:', impersonatedUserData.role);
            setImpersonatedUserId(null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('impersonatedUserId');
            }
          }
        } else {
          console.error('Impersonated user document not found:', impersonatedUserId);
          setImpersonatedUser(null);
          setImpersonatedUserId(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('impersonatedUserId');
          }
        }
      } catch (error) {
        console.error('Error fetching impersonated user data:', error);
        setImpersonatedUser(null);
        setImpersonatedUserId(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('impersonatedUserId');
        }
      } finally {
        setIsLoadingUser(false);
      }
    };

    // Only fetch if we have permission to impersonate
    if (canImpersonate) {
      fetchImpersonatedUserData();
    } else if (impersonatedUserId) {
      // Clear impersonation if no permission
      setImpersonatedUserId(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('impersonatedUserId');
      }
    }
  }, [impersonatedUserId, canImpersonate, canImpersonateUser]);

  const handleSetImpersonatedUserId = (userId: string | null) => {
    setImpersonatedUserId(userId);

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      if (userId) {
        localStorage.setItem('impersonatedUserId', userId);
      } else {
        localStorage.removeItem('impersonatedUserId');
      }
    }
  };

  const clearImpersonation = () => {
    console.log('ImpersonationContext - clearImpersonation called');
    handleSetImpersonatedUserId(null);
  };

  const value: ImpersonationContextType = {
    impersonatedUserId,
    impersonatedUser,
    setImpersonatedUserId: handleSetImpersonatedUserId,
    clearImpersonation,
    isImpersonating: !!impersonatedUserId,
    canImpersonate,
    canImpersonateUser,
    isHydrated,
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
