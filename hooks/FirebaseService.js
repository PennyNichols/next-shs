import { createContext, useCallback, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './auth/auth';
import axios from 'axios';

// IMPORTANT: Replace with your deployed Cloud Function URL
// During local development, this might be 'http://localhost:5001/YOUR_PROJECT_ID/us-east1/api'
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
if (!PROJECT_ID) {
  throw new Error('FIREBASE_PROJECT_ID environment variable is not set.');
}

// !! UNCOMMENT THIS LINE WHEN DEPLOYING TO PRODUCTION !!
// const BASE_CLOUD_FUNCTION_URL = `https://us-east1-${PROJECT_ID}.cloudfunctions.net/api`;
const BASE_CLOUD_FUNCTION_URL =
  process.env.NODE_ENV === 'development'
    ? `http://127.0.0.1:5001/next-shs/us-east1/api`
    : `https://us-east1-${PROJECT_ID}.cloudfunctions.net/api`;

const FirebaseCollectionContext = createContext({});

export function FirebaseCollectionProvider({ children }) {
  // Get the getCurrentUser function from your useAuth hook
  const { getCurrentUser } = useAuth();

  const getAuthToken = useCallback(async () => {
    // Use the getCurrentUser function to get the current Firebase user
    const user = getCurrentUser();
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }, [getCurrentUser]); // Add getCurrentUser to the dependency array

  // ----- Client-Side Firebase Functions -----
  const createSubscriber = async (email) => {
    try {
      await addDoc(collection(db, 'subscribers'), { email });
      return 'Thank you for subscribing!';
    } catch (error) {
      console.error('Error adding subscriber:', error);
      return 'Error subscribing. Please try again.';
    }
  };
  const createEstimateRequest = async (estimateData, imageFiles, userId = null) => {
    try {
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(getStorage(), `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        }),
      );

      const requestBody = {
        estimateData,
        images: uploadedImageUrls,
        scopeOfWork: Object.keys(estimateData.scopeOfWork).filter((key) => estimateData.scopeOfWork[key]),
        userId: userId, // userId can be null for unauthenticated requests
        status: 'pending',
      };

      // Directly add to Firestore for unauthenticated users
      const docRef = await addDoc(collection(db, 'estimate_requests'), requestBody);
      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error('Error creating estimate request client-side:', error);
      return { success: false, error: error.message };
    }
  };
  const getBlogPosts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }, []);

  // ----- Backend Cloud Function Calls -----

  const getSubscribers = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to get subscribers.');
      }
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASE_CLOUD_FUNCTION_URL}/subscribers`, { headers });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching subscribers via backend:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  const deleteSubscriber = async (subscriberId) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to delete subscriber.');
      }
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BASE_CLOUD_FUNCTION_URL}/subscribers/${subscriberId}`, { headers });
      return { success: true };
    } catch (error) {
      console.error('Error deleting subscriber via backend:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  // Blog Post Management (Admin/Authenticated Users Only)
  const createBlogPost = async (blogData, imageFiles) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to create a blog post.');
      }
      const headers = { Authorization: `Bearer ${token}` };

      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(getStorage(), `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        }),
      );

      const requestBody = {
        ...blogData,
        images: uploadedImageUrls,
      };

      const response = await axios.post(`${BASE_CLOUD_FUNCTION_URL}/blog-posts`, requestBody, { headers });
      return { success: true, docId: response.data.id };
    } catch (error) {
      console.error('Error creating blog post via backend:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  const deleteBlogPost = async (blogPostId) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to delete a blog post.');
      }
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BASE_CLOUD_FUNCTION_URL}/blog-posts/${blogPostId}`, { headers });
      return { success: true };
    } catch (error) {
      console.error('Error deleting blog post via backend:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  const updateBlogPost = async (blogPostId, blogData, imageFiles) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to update a blog post.');
      }
      const headers = { Authorization: `Bearer ${token}` };

      let uploadedImageUrls = [];
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
      };

      await axios.put(`${BASE_CLOUD_FUNCTION_URL}/blog-posts/${blogPostId}`, requestBody, { headers });
      return { success: true };
    } catch (error) {
      console.error('Error updating blog post via backend:', error.response ? error.response.data : error.message);
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  // Estimate Request Management (Authenticated Users Only for Read/Update/Delete)
  const getEstimateRequests = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to get estimate requests.');
      }
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASE_CLOUD_FUNCTION_URL}/estimate-requests`, { headers });
      return { success: true, data: response.data };
    } catch (error) {
      console.error(
        'Error fetching estimate requests via backend:',
        error.response ? error.response.data : error.message,
      );
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  const deleteEstimateRequest = async (estimateRequestId) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to delete estimate request.');
      }
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BASE_CLOUD_FUNCTION_URL}/estimate-requests/${estimateRequestId}`, { headers });
      return { success: true };
    } catch (error) {
      console.error(
        'Error deleting estimate request via backend:',
        error.response ? error.response.data : error.message,
      );
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

  const updateEstimateRequest = async (estimateRequestId, estimateData, imageFiles) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required to update estimate request.');
      }
      const headers = { Authorization: `Bearer ${token}` };

      let uploadedImageUrls = [];
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
      };

      await axios.put(`${BASE_CLOUD_FUNCTION_URL}/estimate-requests/${estimateRequestId}`, requestBody, { headers });
      return { success: true };
    } catch (error) {
      console.error(
        'Error updating estimate request via backend:',
        error.response ? error.response.data : error.message,
      );
      return { success: false, error: error.response ? error.response.data.error : error.message };
    }
  };

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
    // createUser is implicitly handled by useAuth's signUp function which creates the Firestore doc
  };

  return <FirebaseCollectionContext.Provider value={value}>{children}</FirebaseCollectionContext.Provider>;
}

export function useFirebaseCollections() {
  return useContext(FirebaseCollectionContext);
}