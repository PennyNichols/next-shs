import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// This function is the middleware.
// It will be imported by your route files.
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Unauthorized. No token provided.' });
  }

  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
    // This is where you add the user to the request object.
    // Make sure you have the global type definition from our previous discussion.
    req.user = await admin.auth().verifyIdToken(idToken);
    return next(); // Pass control to the next handler (your route logic)
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(403).send({ error: 'Unauthorized. Invalid token.' });
  }
};
