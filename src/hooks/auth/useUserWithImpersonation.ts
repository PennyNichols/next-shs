import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { UserData } from './useUser';

/**
 * Enhanced user hook that supports impersonation
 * Returns the impersonated user's data when impersonating, otherwise returns current user's data
 */
const useUserWithImpersonation = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { impersonatedUserId, isImpersonating } = useImpersonation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [error, setError] = useState<any>(null);

  // Determine which user ID to fetch data for
  const targetUserId = isImpersonating && impersonatedUserId ? impersonatedUserId : currentUser?.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUserData(true);
      setError(null);
      
      if (targetUserId) {
        try {
          const docSnap = await getDoc(doc(db, 'users', targetUserId));
          if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            const userData: UserData = {
              id: docSnap.id,
              role: firestoreData.role || firestoreData.type || '',
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
            setUserData(null);
            console.warn(`Firestore document for user ${targetUserId} does not exist.`);
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

    // Only attempt to fetch user data if auth has finished loading
    if (!authLoading) {
      fetchUserData();
    }
  }, [targetUserId, authLoading]);

  // Combine loading states
  const isLoading = authLoading || loadingUserData;

  return { 
    user: userData, 
    loading: isLoading, 
    error,
    isImpersonating,
    actualUser: currentUser,
    targetUserId
  };
};

export default useUserWithImpersonation;
