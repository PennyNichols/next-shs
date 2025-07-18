/**
 * Firebase configuration and initialization file.
 * This file initializes the Firebase app with the provided configuration
 * and sets up Firebase services such as Authentication, Firestore, Storage,
 * and Analytics. It ensures that the Firebase app is initialized only once
 * and exports the necessary services for use in the application. It also 
 * initializes Firebase Emulators to provide a local development environment
 * for testing to all developers. View the README for more information.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { Firestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { getFunctions, connectFunctionsEmulator, Functions } from 'firebase/functions';

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
const app: FirebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Firebase services and type them
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const analytics: Analytics | null = typeof window !== 'undefined' ? getAnalytics(app) : null;
// For Cloud Functions, the region is required if your functions are not in us-central1
// Region must match the deployed functions' region
const functions: Functions = getFunctions(app, 'us-east1'); // Ensure this region matches your deployed functions

// IMPORTANT: Connect to Firebase Emulators ONLY in development
if (process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase Emulators...');

  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { app, auth, db, storage, analytics, functions };