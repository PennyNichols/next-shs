import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const getCurrentUser = () => {
  return auth.currentUser;
};

export function useAuth() {
  const [error, setError] = useState(null);

  const signUp = async (email, password, firstName, lastName, phoneNumber) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        role: 'client',
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        userId: user.uid,
      });
      return user;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const signIn = async (email, password) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const signOutUser = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteAccount = async () => {
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in.');
      }

      await deleteDoc(doc(db, 'users', user.uid));

      await deleteUser(user);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { signUp, signIn, signOutUser, deleteAccount, getCurrentUser, error };
}
