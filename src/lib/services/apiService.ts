// src/lib/services/apiService.ts
import axios from 'axios';
import { auth } from '../firebase/firebase'; // Assuming firebase.ts is in src/lib/

// Base URL for your Cloud Functions API
// IMPORTANT: Adjust for local development vs. production!
const BASE_CLOUD_FUNCTION_URL =
  //   process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL
  //   ||
  'http://localhost:5001/next-shs/us-east1/api';

const apiService = axios.create({
  baseURL: BASE_CLOUD_FUNCTION_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Firebase ID Token
apiService.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiService;