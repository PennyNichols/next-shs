/* eslint-disable no-console */

import * as admin from 'firebase-admin';

// Do not use const admin = require('firebase-admin');
// Already used in index.ts, can't be used again in the same module.

async function authenticate(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; 
      next();
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    }
  } else {
    res.status(403).send('Unauthorized: No token provided');
  }
}

module.exports = authenticate;
