import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase'; // Assuming '@/lib/firebase' points to your firebase.ts
import { useAuth } from '@/contexts/AuthContext/AuthContext'; // Import from your AuthContext

export interface UserData {
  id: string;
  type: string;
  first: string;
  last: string;
  phone: string;
  email: string;
  profilePictureURL?: string;
  signatureURL?: string;
  activeOn?: string;
  status: string;
  emailVerified: boolean;
  primaryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  serviceAddresses?: Array<{
    id: number;
    label: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    contactPerson?: {
      first: string;
      last: string;
      phone: string;
      email?: string;
    };
    propertyType: string;
    ownerOccupied: boolean;
    inServiceArea: boolean;
    hasPets: boolean;
    isDefault: boolean;
    createdOn: string;
  }>;
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    phone: boolean;
    push: boolean;
    marketing: boolean;
    serviceReminders: boolean;
    estimateUpdates: boolean;
    promotions: boolean;
  };
  notes?: Array<{
    id: number;
    message: string;
    author: string;
    isInternal: boolean;
    createdBy: string;
    createdOn: string;
    updatedOn: string;
  }>;
  createdOn: string;
  updatedOn: string;
}

const useUser = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUserData(true);
      setError(null);
      if (currentUser) {
        try {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            const userData: UserData = {
              id: docSnap.id,
              type: firestoreData.type || '',
              first: firestoreData.first || '',
              last: firestoreData.last || '',
              phone: firestoreData.phone || '',
              email: firestoreData.email || '',
              profilePictureURL: firestoreData.profilePictureURL,
              signatureURL: firestoreData.signatureURL,
              activeOn: firestoreData.activeOn,
              status: firestoreData.status || 'active',
              emailVerified: firestoreData.emailVerified || false,
              primaryAddress: firestoreData.primaryAddress,
              serviceAddresses: firestoreData.serviceAddresses || [],
              communicationPreferences: firestoreData.communicationPreferences,
              notes: firestoreData.notes || [],
              createdOn: firestoreData.createdOn || '',
              updatedOn: firestoreData.updatedOn || '',
            };
            setUserData(userData);
          } else {
            // User authenticated but no user document in Firestore (e.g., new user created but doc creation failed)
            setUserData(null);
            console.warn(`Firestore document for user ${currentUser.uid} does not exist.`);
          }
        } catch (err: any) {
          console.error('Error fetching user data from Firestore:', err);
          setError(err);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoadingUserData(false);
    };

    // Only attempt to fetch user data if:
    //  1. If AuthContext has finished loading
    //  2. If there's a currentUser
    //  3. If currentUser becomes null (to clear data).
    if (!authLoading) {
      fetchUserData();
    }
  }, [currentUser, authLoading]);

  // Combine loading states
  const isLoading = authLoading || loadingUserData;

  return { user: userData, loading: isLoading, error };
}

export default useUser;
