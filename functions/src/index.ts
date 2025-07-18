import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { apiRouter } from './routes';
import {getDrivingDistance} from './callable/distance'; // Import your callable function

admin.initializeApp();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5001',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5001',
  // 'https://your-vercel-app.vercel.app', // Add production URLs here
  'https://shs-florida.com',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// --- Cloud Function for your dedicated API ---
const apiApp = express();
// Apply middleware
apiApp.use(cors(corsOptions)); 
apiApp.use(express.json());
apiApp.use('/', apiRouter); 

// Expose your Express API as a Cloud Function named "api"
export const api = functions.https.onRequest({ region: 'us-east1', secrets: ["RECAPTCHA_SECRET_KEY"] }, apiApp);
export { getDrivingDistance }
