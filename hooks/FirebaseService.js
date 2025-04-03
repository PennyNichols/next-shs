import React, { createContext, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

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

  const updateBlogPost = async (blogPostId, blogData, imageFiles) => {
    try {
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

      const transformedData = {
        ...blogData,
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : blogData.images, //Keep old images if none uploaded
        date_updated: new Date().toISOString(),
      };

      await updateDoc(doc(db, 'blogPosts', blogPostId), transformedData);
      return { success: true };
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { success: false, error: error.message };
    }
  };

  const addEstimateRequest = async (estimateData, imageFiles, userId = null) => {
    // userId is now optional, defaults to null
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
        userId: userId, // Store the user ID, or null if unauthenticated
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

  const updateEstimateRequest = async (estimateRequestId, estimateData, imageFiles, currentUserId) => {
    try {
      const docRef = doc(db, 'estimateRequests', estimateRequestId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (docData.userId && docData.userId !== currentUserId) {
          // Check if userId exists and matches
          return { success: false, error: 'You are not authorized to update this request.' };
        } else if (!docData.userId) {
          return { success: false, error: 'unauthenticated users cannot edit this estimate' };
        }
      } else {
        return { success: false, error: 'Document does not exist.' };
      }

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

      const transformedData = {
        ...estimateData,
        scopeOfWork: Object.keys(estimateData.scopeOfWork).filter((key) => estimateData.scopeOfWork[key]),
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : estimateData.images,
        date_updated: new Date().toISOString(),
      };

      await updateDoc(docRef, transformedData);
      return { success: true };
    } catch (error) {
      console.error('Error updating estimate request:', error);
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
    updateBlogPost,
    addEstimateRequest,
    getEstimateRequests,
    deleteEstimateRequest,
    updateEstimateRequest,
  };

  return <FirebaseCollectionContext.Provider value={value}>{children}</FirebaseCollectionContext.Provider>;
}

export function useFirebaseCollections() {
  return useContext(FirebaseCollectionContext);
}
