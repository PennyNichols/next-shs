import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged, // Crucial for real-time auth state
  User, // Firebase User type
  reauthenticateWithCredential, // To reauthenticate user before sensitive ops like delete
  EmailAuthProvider, // For reauthentication credential
} from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase/firebase'; // Assuming firebase.ts is in lib

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: any;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>; // Added password for reauthentication
  reauthenticateUser: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state true for auth check
  const [error, setError] = useState<any>(null);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once the initial auth state is determined
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []); // Run only once on component mount

  const signUp = useCallback(
    async (email, password, firstName, lastName, phoneNumber) => {
      setError(null);
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          role: 'client', // Default role
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          userId: user.uid,
          createdOn: new Date().toISOString(),
        });
        // setCurrentUser will be updated by onAuthStateChanged listener
        return user;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [] // No dependencies as it's a core auth function
  );

  const signIn = useCallback(
    async (email, password) => {
      setError(null);
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // setCurrentUser will be updated by onAuthStateChanged listener
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signOutUser = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await signOut(auth);
      // setCurrentUser will be updated to null by onAuthStateChanged listener
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
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


  const deleteAccount = useCallback(async (password: string) => {
    setError(null);
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in to delete account.');
      }

      // Reauthenticate before sensitive operation
      await reauthenticateUser(password); // Ensure the user is recently authenticated

      // Delete user document from Firestore first
      await deleteDoc(doc(db, 'users', user.uid));

      // Delete Firebase Auth user
      await deleteUser(user);
      // setCurrentUser will be updated to null by onAuthStateChanged listener
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [reauthenticateUser]); // Dependency: reauthenticateUser

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signOutUser,
    deleteAccount,
    reauthenticateUser,
  };

  // Render children only when loading is complete to prevent flashing UI
  // or components trying to access currentUser before it's set.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};