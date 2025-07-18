import axios from 'axios';
import { auth } from '../firebase/firebase'; // Assuming firebase.ts is in src/lib/firebase/

// Base URL for your Cloud Functions API
// This will be set via environment variables during deployment (Vercel)
// For local development (npm run dev), it will fall back to the Firebase Functions Emulator.
const BASE_CLOUD_FUNCTION_URL =
  process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL || // This variable will be defined in your .env files or Vercel
  'http://localhost:5001/next-shs/us-east1/api'; // Fallback for local emulator testing

const apiService = axios.create({
  baseURL: BASE_CLOUD_FUNCTION_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Firebase ID Token for authenticated requests
apiService.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser; // Get the current authenticated user
    if (user) {
      const token = await user.getIdToken(); // Get the ID token
      config.headers.Authorization = `Bearer ${token}`; // Attach it to the Authorization header
    }
    return config; // Continue with the request
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Optional: Add a response interceptor for centralized error handling and logging
apiService.interceptors.response.use(
  (response) => response, // Just return the response if successful
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error, CORS)
      console.error('API No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message);
    }
    // Re-throw the error so it can be caught by the calling function
    return Promise.reject(error);
  },
);

export default apiService;
