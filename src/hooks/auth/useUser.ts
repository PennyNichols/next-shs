import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase'; // Assuming '@/lib/firebase' points to your firebase.ts
import { useAuth } from '@/contexts/AuthContext/AuthContext'; // Import from your AuthContext

function useUser() {
  const { currentUser, loading: authLoading } = useAuth(); // Get currentUser and loading from AuthContext
  const [userData, setUserData] = useState<any | null>(null); // Renamed to avoid confusion with Firebase User object
  const [loadingUserData, setLoadingUserData] = useState(true); // Loading state specifically for Firestore user data
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUserData(true);
      setError(null);
      if (currentUser) {
        try {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            setUserData({ id: docSnap.id, ...docSnap.data() });
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
        // No current user, so no user data to fetch
        setUserData(null);
      }
      setLoadingUserData(false);
    };

    // Only attempt to fetch user data if AuthContext has finished loading
    // and there's a currentUser, or if currentUser becomes null (to clear data).
    if (!authLoading) {
      fetchUserData();
    }
    // Dependency array: re-run when currentUser or authLoading changes
  }, [currentUser, authLoading]);

  // Combine loading states for a holistic view
  const isLoading = authLoading || loadingUserData;

  return { user: userData, loading: isLoading, error };
}

export default useUser;
