import { createContext, useCallback, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../lib/firebase/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext/AuthContext';
import apiService from '../../lib/services/apiService';

interface SubscriberData {
  email: string;
  date_subscribed: string;
}

interface BlogPostData {
  [key: string]: any;
  title: string;
  content: string;
  authorId: string;
  images?: string[];
  date_created?: string;
  date_updated?: string;
}

interface EstimateRequestData {
  userId?: string | null;
  scopeOfWork: { [key: string]: boolean };
  images?: string[];
  status?: string;
  date_created?: string;
  date_updated?: string;
}

interface FirebaseCollectionContextType {
  createSubscriber: (email: string) => Promise<string>;
  getSubscribers: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
  deleteSubscriber: (subscriberId: string) => Promise<{ success: boolean; error?: string }>;
  createBlogPost: (postData: any, imageFiles?: File[]) => Promise<{ success: boolean; docId?: string; error?: string }>;
  getBlogPosts: () => Promise<any[]>;
  deleteBlogPost: (blogPostId: string) => Promise<{ success: boolean; error?: string }>;
  updateBlogPost: (
    blogPostId: string,
    postData: BlogPostData,
    imageFiles?: File[],
  ) => Promise<{ success: boolean; error?: string }>;
  createEstimateRequest: (
    estimateData: EstimateRequestData,
    imageFiles?: File[],
    userId?: string | null,
  ) => Promise<{ success: boolean; docId?: string; error?: string }>;
  getEstimateRequests: (queryParams?: any) => Promise<{ success: boolean; data?: any[]; error?: string }>;
  deleteEstimateRequest: (estimateRequestId: string) => Promise<{ success: boolean; error?: string }>;
  updateEstimateRequest: (
    estimateRequestId: string,
    estimateData: EstimateRequestData,
    imageFiles?: File[],
  ) => Promise<{ success: boolean; error?: string }>;
}

const FirebaseCollectionContext = createContext<FirebaseCollectionContextType | undefined>(undefined);

export function FirebaseCollectionProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth(); // Get currentUser from the new AuthContext

  // --- Client-Side Firebase Functions (still use direct Firestore) ---
  // These functions do NOT go through your Cloud Functions API,
  // hence they don't use apiService directly for Firestore operations.
  // Firebase security rules should govern access.
  const createSubscriber = useCallback(async (email) => {
    try {
      await addDoc(collection(db, 'subscribers'), { email });
      return 'Thank you for subscribing!';
    } catch (error: any) {
      console.error('Error adding subscriber:', error);
      return 'Error subscribing. Please try again.';
    }
  }, []);

  const createEstimateRequest = useCallback(
    async (
      estimateData: EstimateRequestData,
      imageFiles?: File[],
      userId: string | null = null,
    ): Promise<{ success: boolean; docId?: string; error?: string }> => {
      try {
        let uploadedImageUrls: string[] = [];
        if (imageFiles && imageFiles.length > 0) {
          try {
            uploadedImageUrls = await Promise.all(
              imageFiles.map(async (file) => {
                const storageRef = ref(getStorage(), `images/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                return getDownloadURL(snapshot.ref);
              }),
            );
          } catch (uploadError) {
            console.error('Error uploading images:', uploadError);
            // Continue with submission even if image upload fails
            uploadedImageUrls = [];
          }
        }

        const requestBody = {
          ...estimateData,
          // Ensure scopeOfWork is an array of selected keys
          scopeOfWork: Object.keys(estimateData.scopeOfWork).filter((key) => estimateData.scopeOfWork[key]),
          images: uploadedImageUrls,
          // Use provided userId, or current authenticated user's UID, or null
          userId: userId || currentUser?.uid || null,
          status: 'pending',
          date_created: new Date().toISOString(),
        };

        // Send the request through your backend API (Cloud Function)
        const response = await apiService.post('/estimate-requests', requestBody);
        return { success: true, docId: response.data.id };
      } catch (error: any) {
        console.error('Error creating estimate request via backend:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || error.message };
      }
    },
    [currentUser],
  ); // Dependency: currentUser

  const getBlogPosts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }, []);

  // --- Backend Cloud Function Calls (now use apiService) ---

  const getSubscribers = useCallback(async () => {
    try {
      // apiService's interceptor handles auth token
      const response = await apiService.get('/subscribers');
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching subscribers via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const deleteSubscriber = useCallback(async (subscriberId) => {
    try {
      await apiService.delete(`/subscribers/${subscriberId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting subscriber via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const createBlogPost = useCallback(
    async (blogData, imageFiles) => {
      try {
        let uploadedImageUrls: string[] = [];
        if (imageFiles && imageFiles.length > 0) {
          uploadedImageUrls = await Promise.all(
            imageFiles.map(async (file) => {
              const storageRef = ref(getStorage(), `images/${file.name}`);
              const snapshot = await uploadBytes(storageRef, file);
              return getDownloadURL(snapshot.ref);
            }),
          );
        }

        const requestBody = {
          ...blogData,
          images: uploadedImageUrls,
          authorId: currentUser?.uid, // Send author ID from authenticated user
        };

        const response = await apiService.post('/blog-posts', requestBody);
        return { success: true, docId: response.data.id };
      } catch (error: any) {
        console.error('Error creating blog post via backend:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || error.message };
      }
    },
    [currentUser],
  ); // Dependency: currentUser

  const deleteBlogPost = useCallback(async (blogPostId) => {
    try {
      await apiService.delete(`/blog-posts/${blogPostId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting blog post via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const updateBlogPost = useCallback(async (blogPostId, blogData, imageFiles) => {
    try {
      let uploadedImageUrls: string[] = [];
      if (imageFiles && imageFiles.length > 0) {
        uploadedImageUrls = await Promise.all(
          imageFiles.map(async (file) => {
            const storageRef = ref(getStorage(), `images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return getDownloadURL(snapshot.ref);
          }),
        );
      }

      const requestBody = {
        ...blogData,
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : blogData.images,
        date_updated: new Date().toISOString(),
      };

      await apiService.put(`/blog-posts/${blogPostId}`, requestBody);
      return { success: true };
    } catch (error: any) {
      console.error('Error updating blog post via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const getEstimateRequests = useCallback(async (queryParams = {}) => {
    try {
      const response = await apiService.get('/estimate-requests', { params: queryParams });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Error fetching estimate requests via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const deleteEstimateRequest = useCallback(async (estimateRequestId) => {
    try {
      await apiService.delete(`/estimate-requests/${estimateRequestId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting estimate request via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const updateEstimateRequest = useCallback(async (estimateRequestId, estimateData, imageFiles) => {
    try {
      let uploadedImageUrls: string[] = [];
      if (imageFiles && imageFiles.length > 0) {
        uploadedImageUrls = await Promise.all(
          imageFiles.map(async (file) => {
            const storageRef = ref(getStorage(), `images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return getDownloadURL(snapshot.ref);
          }),
        );
      }

      const requestBody = {
        ...estimateData,
        scopeOfWork: Object.keys(estimateData.scopeOfWork).filter((key) => estimateData.scopeOfWork[key]),
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : estimateData.images,
        date_updated: new Date().toISOString(),
      };

      await apiService.put(`/estimate-requests/${estimateRequestId}`, requestBody);
      return { success: true };
    } catch (error: any) {
      console.error('Error updating estimate request via backend:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }, []);

  const value = {
    createSubscriber,
    getSubscribers,
    deleteSubscriber,
    createBlogPost,
    getBlogPosts,
    deleteBlogPost,
    updateBlogPost,
    createEstimateRequest,
    getEstimateRequests,
    deleteEstimateRequest,
    updateEstimateRequest,
  };

  return <FirebaseCollectionContext.Provider value={value}>{children}</FirebaseCollectionContext.Provider>;
}

export function useFirebaseCollections() {
  const context = useContext(FirebaseCollectionContext);
  if (context === undefined) {
    throw new Error('useFirebaseCollections must be used within a FirebaseCollectionProvider');
  }
  return context;
}