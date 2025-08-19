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
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        type: 'client',
        first: firstName,
        last: lastName,
        phone: phoneNumber,
        status: 'active',
        emailVerified: false,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      });
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await signOut(auth);
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
    error,
    signUp,
    signIn,
    signOutUser,
    deleteAccount,
    reauthenticateUser,
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