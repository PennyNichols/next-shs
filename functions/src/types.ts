import * as admin from 'firebase-admin';

// This tells TypeScript to add a 'user' property to the Express Request object
declare global {
  namespace Express {
    export interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}
