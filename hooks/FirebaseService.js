import React, { createContext, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

const FirebaseCollectionContext = createContext();

export function FirebaseCollectionProvider({ children }) {
  const addSubscriber = async (email) => {
    try {
      await addDoc(collection(db, 'subscribers'), { email });
      return 'Thank you for subscribing!';
    } catch (error) {
      console.error('Error adding subscriber:', error);
      return 'Error subscribing. Please try again.';
    }
  };

  const getSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subscribers'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return [];
    }
  };

  const deleteSubscriber = async (subscriberId) => {
    try {
      await deleteDoc(doc(db, 'subscribers', subscriberId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      return { success: false, error: error.message };
    }
  };

  const addBlogPost = async (blogData, imageFiles) => {
    try {
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(getStorage(), `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        }),
      );

      const transformedData = {
        ...blogData,
        images: uploadedImageUrls,
        date_created: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'blogPosts'), transformedData);
      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error('Error adding blog post with images:', error);
      return { success: false, error: error.message };
    }
  };

  const getBlogPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  };

  const deleteBlogPost = async (blogPostId) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', blogPostId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: error.message };
    }
  };

  const addEstimateRequest = async (estimateData, imageFiles) => {
    try {
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(getStorage(), `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        }),
      );

      const transformedData = {
        ...estimateData,
        scopeOfWork: Object.keys(estimateData.scopeOfWork).filter((key) => estimateData.scopeOfWork[key]),
        images: uploadedImageUrls,
        date_created: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'estimateRequests'), transformedData);
      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error('Error adding estimate request with images:', error);
      return { success: false, error: error.message };
    }
  };

  const getEstimateRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'estimateRequests'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching estimate requests:', error);
      return [];
    }
  };

  const deleteEstimateRequest = async (estimateRequestId) => {
    try {
      await deleteDoc(doc(db, 'estimateRequests', estimateRequestId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting estimate request:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    addSubscriber,
    getSubscribers,
    deleteSubscriber,
    addBlogPost,
    getBlogPosts,
    deleteBlogPost,
    addEstimateRequest,
    getEstimateRequests,
    deleteEstimateRequest,
  };

  return <FirebaseCollectionContext.Provider value={value}>{children}</FirebaseCollectionContext.Provider>;
}

export function useFirebaseCollections() {
  return useContext(FirebaseCollectionContext);
}
