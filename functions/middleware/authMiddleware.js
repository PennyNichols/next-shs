/* eslint-disable no-console */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not already done
// Make sure this is only called once in your application
// const serviceAccount = require('./path/to/your/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

async function authenticate(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; // Attach the decoded user object to the request
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
