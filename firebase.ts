/**
 * Firebase configuration and initialization file.
 * This file initializes the Firebase app with the provided configuration
 * and sets up Firebase services such as Authentication, Firestore, Storage,
 * and Analytics. It ensures that the Firebase app is initialized only once
 * and exports the necessary services for use in the application.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // for authentication
import { Firestore, getFirestore } from 'firebase/firestore'; // for cloud firestore
import { getStorage } from 'firebase/storage'; // for cloud storage
import { getAnalytics } from 'firebase/analytics'; // for analytics
import { getFunctions } from 'firebase/functions'; // for cloud functions

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const functions = getFunctions(app);

export { app, auth, db, storage, analytics, functions };
