import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from '../../lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import { getDashboardRouteForRole } from '@/lib/utils/roleBasedRouting';

interface EnhancedUser extends User {
  role?: string;
  customClaims?: any;
}

interface AuthContextType {
  currentUser: EnhancedUser | null;
  loading: boolean;
  signingOut: boolean;
  error: any;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
  ) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  reauthenticateUser: (password: string) => Promise<void>;
  refreshUserClaims: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<EnhancedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  // Function to enhance user with custom claims
  const enhanceUserWithClaims = async (user: User): Promise<EnhancedUser> => {
    try {
      const idTokenResult = await user.getIdTokenResult();
      const customClaims = idTokenResult.claims;

      // Extract role from custom claims
      let role = customClaims.role || customClaims.type;

      // If no role in custom claims, fall back to Firestore
      if (!role) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            role = userData.role || userData.type || 'client';
          }
        } catch (firestoreError) {
          console.warn('Failed to get role from Firestore:', firestoreError);
          role = 'client'; // Ultimate fallback
        }
      }

      return {
        ...user,
        role,
        type: role, // For backward compatibility
        customClaims,
      } as EnhancedUser;
    } catch (error) {
      console.warn('Failed to get custom claims:', error);
      // Fall back to Firestore even if token fails
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role || userData.type || 'client';
          return {
            ...user,
            role,
            type: role,
            customClaims: {},
          } as EnhancedUser;
        }
      } catch (firestoreError) {
        console.warn('Failed to get user data from Firestore:', firestoreError);
      }

      return {
        ...user,
        role: 'client',
        type: 'client',
        customClaims: {},
      } as EnhancedUser;
    }
  };

  const refreshUserClaims = useCallback(async () => {
    if (auth.currentUser) {
      try {
        // Force token refresh
        await auth.currentUser.getIdToken(true);
        const enhancedUser = await enhanceUserWithClaims(auth.currentUser);
        setCurrentUser(enhancedUser);
      } catch (error) {
        console.error('Failed to refresh user claims:', error);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const enhancedUser = await enhanceUserWithClaims(user);
        setCurrentUser(enhancedUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = useCallback(async (email, password, firstName, lastName, phoneNumber) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Import schema manager
      const { createUserDocument } = await import('@/lib/schemas/userSchemaManager');

      // Create complete user document with all required fields for client role
      await createUserDocument(user.uid, {
        role: 'client',
        email: email,
        first: firstName,
        last: lastName,
        phone: phoneNumber,
        status: 'active',
        emailVerified: false,
      });

      // Set custom claims for the new user (with a small delay to ensure user doc is created)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        const functions = getFunctions(undefined, 'us-east1');
        const setUserRoleFunction = httpsCallable(functions, 'setUserRole');
        await setUserRoleFunction({ uid: user.uid, role: 'client' });
        console.log('Custom claims set for new user');

        // Force refresh the current user to get updated claims
        await refreshUserClaims();

        // Get the role from custom claims for routing
        const tokenResult = await user.getIdTokenResult();
        const userRole = (tokenResult.claims.role as string) || 'client';

        // Route to appropriate dashboard based on user role from custom claims
        const dashboardRoute = getDashboardRouteForRole(userRole);
        router.push(dashboardRoute);
      } catch (claimsError) {
        console.warn('Failed to set custom claims during signup:', claimsError);
        // Fallback to default client dashboard if claims setting fails
        const dashboardRoute = getDashboardRouteForRole('client');
        router.push(dashboardRoute);
      }

      return user;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Wait for custom claims to be available and get the role
      await user.getIdToken(true); // Force refresh to get latest claims
      const tokenResult = await user.getIdTokenResult();
      const userRole = (tokenResult.claims.role as string) || 'client';

      // Route to appropriate dashboard based on user role from custom claims
      const dashboardRoute = getDashboardRouteForRole(userRole);
      router.push(dashboardRoute);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setError(null);
    setSigningOut(true);
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setSigningOut(false);
      setLoading(false);
    }
  }, []);

  const reauthenticateUser = useCallback(async (password: string) => {
    setError(null);
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in to reauthenticate.');
      }
      const credential = EmailAuthProvider.credential(user.email || '', password);
      await reauthenticateWithCredential(user, credential);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(
    async (password: string) => {
      setError(null);
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user is currently signed in to delete account.');
        }

        await reauthenticateUser(password);
        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(user);
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [reauthenticateUser],
  );

  const value = {
    currentUser,
    loading,
    signingOut,
    error,
    signUp,
    signIn,
    signOutUser,
    deleteAccount,
    reauthenticateUser,
    refreshUserClaims,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
