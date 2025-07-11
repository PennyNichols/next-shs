/* eslint-disable no-console */
/* eslint-disable max-len */

const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// If running locally with `firebase emulators:start`
// Firebase CLI automatically provides credentials. 
// When deployed, it uses the default service account.
admin.initializeApp();

// Get a reference to the Firestore database
const db = admin.firestore();

const app = express();

// Configure CORS for your frontend domain(s).
// For development ,allow all origins
// Restrict in production.
app.use(cors({ origin: true }));

// // --- RESTRICTED FOR PRODUCTION ---

// const allowedOrigins = [
//   'https://shs-florida.com',
//   'https://www.shs-florida.com',
//   // Add any other domains that need to access this API
// ];

// // DO NOT USE !origin UNTIL DATABASE AND BACKEND DATA VALIDATION ARE COMPLETE
// // PEOPLE WILL BE ABLE TO BYPASS FRONTEND VALIDATION THIS WAY
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests from origins in our allowed list and requests with no origin using !origin (like mobile apps, postman, or curl requests)
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // For sending cookies or authorization headers across origins
// }));

// Required to parse JSON request bodies
app.use(express.json());

// --- Authentication Middleware ---
const authenticate = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; // Attach decoded token to request for later use
      return next();
    } catch (error) {
      console.error('Error verifying Firebase ID token:', error);
      return res.status(401).send({ error: 'Unauthorized. Invalid token.' });
    }
  } else {
    return res.status(401).send({ error: 'Unauthorized. No token provided.' });
  }
};

// --- API Endpoints using Firestore ---

// Users API Endpoints (All protected for admin-level management)
// NOTE: Initial user creation (signup) is handled client-side via Firebase Auth and auth.js.
// These endpoints are for administrative CRUD on user documents.
app.post('/users', authenticate, async (req, res) => {
  try {
    // Only allow 'super' users to create new users directly via backend
    if (req.user.role !== 'super') {
      return res.status(403).send({ error: 'Forbidden. Only super users can create users via backend.' });
    }

    const { userId, email, role, firstName, lastName, phoneNumber } = req.body;

    // Add a new document to the 'users' collection with the user's UID as the document ID
    await db.collection('users').doc(userId).set({
      email,
      role,
      firstName,
      lastName,
      phoneNumber,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user (backend):', error);
    res.status(500).send({ error: 'Failed to create user', details: error.message });
  }
});

app.get('/users/:userId', authenticate, async (req, res) => {
  try {
    // Implement authorization logic: e.g., 'super' or 'admin' can view users, or user can view their own profile
    if (req.user.role !== 'super' && req.user.role !== 'admin' && req.user.uid !== req.params.userId) {
      return res.status(403).send({ error: 'Forbidden. You do not have permission to view this user.' });
    }

    const { userId } = req.params;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error('Error getting user (backend):', error);
    res.status(500).send({ error: 'Failed to get user', details: error.message });
  }
});

app.put('/users/:userId', authenticate, async (req, res) => {
  try {
    // Implement authorization logic: e.g., 'super' or 'admin' can update users, or user can update their own profile
    if (req.user.role !== 'super' && req.user.role !== 'admin' && req.user.uid !== req.params.userId) {
      return res.status(403).send({ error: 'Forbidden. You do not have permission to update this user.' });
    }

    const { userId } = req.params;
    const { email, role, firstName, lastName, phoneNumber } = req.body;

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Prevent non-super users from changing roles
    if (req.user.role !== 'super' && role && role !== userDoc.data().role) {
      return res.status(403).send({ error: 'Forbidden. Only super users can change user roles.' });
    }

    await userRef.update({
      email,
      role,
      firstName,
      lastName,
      phoneNumber,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user (backend):', error);
    res.status(500).send({ error: 'Failed to update user', details: error.message });
  }
});

app.delete('/users/:userId', authenticate, async (req, res) => {
  try {
    // Only 'super' users can delete users
    if (req.user.role !== 'super') {
      return res.status(403).send({ error: 'Forbidden. Only super users can delete users.' });
    }
    // Prevent user from deleting their own account via this admin endpoint (auth.js deleteAccount is for self-deletion)
    if (req.user.uid === req.params.userId) {
      return res.status(403).send({ error: 'Forbidden. Cannot delete your own account via this admin endpoint.' });
    }

    const { userId } = req.params;
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: 'User not found' });
    }

    await userRef.delete();
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user (backend):', error);
    res.status(500).send({ error: 'Failed to delete user', details: error.message });
  }
});

// Subscriber API Endpoints (Protected except for initial creation handled client-side)
app.get('/subscribers', authenticate, async (req, res) => {
  try {
    // Only 'admin' or 'super' users can get all subscribers
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can view subscribers.' });
    }
    const querySnapshot = await db.collection('subscribers').get();
    const subscribers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(subscribers);
  } catch (error) {
    console.error('Error getting subscribers (backend):', error);
    res.status(500).send({ error: 'Failed to get subscribers', details: error.message });
  }
});

app.delete('/subscribers/:id', authenticate, async (req, res) => {
  try {
    // Only 'admin' or 'super' users can delete subscribers
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can delete subscribers.' });
    }
    const { id } = req.params;
    const subscriberRef = db.collection('subscribers').doc(id);
    const subscriberDoc = await subscriberRef.get();

    if (!subscriberDoc.exists) {
      return res.status(404).send({ message: 'Subscriber not found' });
    }

    await subscriberRef.delete();
    res.status(200).send({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscriber (backend):', error);
    res.status(500).send({ error: 'Failed to delete subscriber', details: error.message });
  }
});

// Blog Posts API Endpoints
app.post('/blog-posts', authenticate, async (req, res) => {
  try {
    // Only 'admin' or 'super' users can create blog posts
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can create blog posts.' });
    }
    const { title, content, images, authorId } = req.body; // Expect images as URLs from client
    const docRef = await db.collection('blogPosts').add({
      title,
      content,
      images: images || [], // Ensure images is an array
      authorId: authorId || req.user.uid, // Default to current user if not provided
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'published', // Default status
    });
    res.status(201).send({ message: 'Blog post created successfully', id: docRef.id });
  } catch (error) {
    console.error('Error creating blog post (backend):', error);
    res.status(500).send({ error: 'Failed to create blog post', details: error.message });
  }
});

app.get('/blog-posts', async (req, res) => {
  // Publicly accessible to get all blog posts
  try {
    const querySnapshot = await db.collection('blogPosts').get();
    const blogPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(blogPosts);
  } catch (error) {
    console.error('Error getting blog posts (backend):', error);
    res.status(500).send({ error: 'Failed to get blog posts', details: error.message });
  }
});

app.get('/blog-posts/:id', async (req, res) => {
  // Publicly accessible to get a single blog post
  try {
    const { id } = req.params;
    const blogPostDoc = await db.collection('blogPosts').doc(id).get();

    if (!blogPostDoc.exists) {
      return res.status(404).send({ message: 'Blog post not found' });
    }

    res.status(200).send({ id: blogPostDoc.id, ...blogPostDoc.data() });
  } catch (error) {
    console.error('Error getting blog post (backend):', error);
    res.status(500).send({ error: 'Failed to get blog post', details: error.message });
  }
});

app.put('/blog-posts/:id', authenticate, async (req, res) => {
  try {
    // Only 'admin' or 'super' users can update blog posts
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can update blog posts.' });
    }
    const { id } = req.params;
    const { title, content, images, status } = req.body;

    const blogPostRef = db.collection('blogPosts').doc(id);
    const blogPostDoc = await blogPostRef.get();

    if (!blogPostDoc.exists) {
      return res.status(404).send({ message: 'Blog post not found' });
    }

    await blogPostRef.update({
      title,
      content,
      images,
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post (backend):', error);
    res.status(500).send({ error: 'Failed to update blog post', details: error.message });
  }
});

app.delete('/blog-posts/:id', authenticate, async (req, res) => {
  try {
    // Only 'admin' or 'super' users can delete blog posts
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can delete blog posts.' });
    }
    const { id } = req.params;
    const blogPostRef = db.collection('blogPosts').doc(id);
    const blogPostDoc = await blogPostRef.get();

    if (!blogPostDoc.exists) {
      return res.status(404).send({ message: 'Blog post not found' });
    }

    await blogPostRef.delete();
    res.status(200).send({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post (backend):', error);
    res.status(500).send({ error: 'Failed to delete blog post', details: error.message });
  }
});

// Estimate Requests API Endpoints
// POST is public for initial creation by unauthenticated users.
app.post('/estimate-requests', async (req, res) => {
  try {
    const { userId, estimateData, images, scopeOfWork } = req.body;

    const docRef = await db.collection('estimate_requests').add({
      userId: userId || null, // Can be null if submitted by unauthenticated user
      estimateData,
      images,
      scopeOfWork,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending', // Initial status
    });

    res.status(201).send({ message: 'Estimate request created successfully', id: docRef.id });
  } catch (error) {
    console.error('Error creating estimate request (backend, public):', error);
    res.status(500).send({ error: 'Failed to create estimate request', details: error.message });
  }
});

// GET, PUT, DELETE for estimate requests are protected
app.get('/estimate-requests', authenticate, async (req, res) => {
  try {
    // Authorization: Super users see all, Admins see assigned, Clients see their own

    // Explicitly declare 'query' as a Firestore Query type.
    // This allows it to hold both the initial CollectionReference
    // and subsequent Query objects from .where() calls.
    /** @type {FirebaseFirestore.Query} */
    let query = db.collection('estimate_requests');

    if (req.user.role === 'client') {
      query = query.where('userId', '==', req.user.uid);
    } else if (req.user.role === 'admin') {
      // Admins might need a specific field to link them to requests, e.g., 'assignedToAdminId'
      // For now, if no explicit assignment, admin might see all or only unassigned
      // This is a placeholder for more complex admin assignment logic
      // Example for admin seeing only their assigned requests:
      // query = query.where('assignedToAdminId', '==', req.user.uid);
    }

    const querySnapshot = await query.get();
    const estimateRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(estimateRequests);
  } catch (error) {
    console.error('Error getting estimate requests (backend, protected):', error);
    res.status(500).send({ error: 'Failed to get estimate requests', details: error.message });
  }
});

app.get('/estimate-requests/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const estimateDoc = await db.collection('estimate_requests').doc(id).get();

    if (!estimateDoc.exists) {
      return res.status(404).send({ message: 'Estimate request not found' });
    }

    // Authorization: User can only view if they are 'super', 'admin', or the owner of the request
    if (req.user.role !== 'super' && req.user.role !== 'admin' && estimateDoc.data().userId !== req.user.uid) {
      return res.status(403).send({ error: 'Forbidden. You do not have permission to view this estimate request.' });
    }

    res.status(200).send({ id: estimateDoc.id, ...estimateDoc.data() });
  } catch (error) {
    console.error('Error getting estimate request (backend, protected):', error);
    res.status(500).send({ error: 'Failed to get estimate request', details: error.message });
  }
});

app.put('/estimate-requests/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, estimateData, images, scopeOfWork, status } = req.body;

    const estimateRef = db.collection('estimate_requests').doc(id);
    const estimateDoc = await estimateRef.get();

    if (!estimateDoc.exists) {
      return res.status(404).send({ message: 'Estimate request not found' });
    }

    // Authorization: Only 'super' or 'admin' can update, or the owning client for certain fields
    if (req.user.role !== 'super' && req.user.role !== 'admin' && estimateDoc.data().userId !== req.user.uid) {
      return res.status(403).send({ error: 'Forbidden. You do not have permission to update this estimate request.' });
    }

    // Further granular control can be added here, e.g., clients can't change 'status'
    if (req.user.role === 'client' && status && status !== estimateDoc.data().status) {
      return res.status(403).send({ error: 'Forbidden. Clients cannot change estimate request status.' });
    }

    await estimateRef.update({
      userId,
      estimateData,
      images,
      scopeOfWork,
      status, // Update status if provided
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({ message: 'Estimate request updated successfully' });
  } catch (error) {
    console.error('Error updating estimate request (backend, protected):', error);
    res.status(500).send({ error: 'Failed to update estimate request', details: error.message });
  }
});

app.delete('/estimate-requests/:id', authenticate, async (req, res) => {
  try {
    // Only 'super' or 'admin' can delete estimate requests
    if (req.user.role !== 'super' && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden. Only authorized users can delete estimate requests.' });
    }
    const { id } = req.params;
    const estimateRef = db.collection('estimate_requests').doc(id);
    const estimateDoc = await estimateRef.get();

    if (!estimateDoc.exists) {
      return res.status(404).send({ message: 'Estimate request not found' });
    }

    await estimateRef.delete();
    res.status(200).send({ message: 'Estimate request deleted successfully' });
  } catch (error) {
    console.error('Error deleting estimate request (backend, protected):', error);
    res.status(500).send({ error: 'Failed to delete estimate request', details: error.message });
  }
});

// --- Export the Express App as a Cloud Function ---
// This exports the Express application as a single HTTP Cloud Function.
exports.api = onRequest(
  {
    region: 'us-east1',
    timeoutSeconds: 60, // Maximum execution time for the function
    // Determine other options needed here for production functions:
    // memory: '512MiB', // Allocated memory (e.g., '256MiB', '1GB')
    // minInstances: 1, // Keep at least one instance warm to reduce cold starts
    // maxInstances: 10, // Maximum number of instances
  },
  app,
);

// WILL NEED SOME OF THIS WHEN MIGRATING TO POSTGRESQL!!!
// DO NOT RE-START THE CLOUDSQL INSTANCE

// const { onRequest } = require('firebase-functions/v2/https');
// const express = require('express');
// const cors = require('cors');
// const { Client } = require('pg');
// const functions = require('firebase-functions');

// const app = express();
// app.use(cors({ origin: true }));
// app.use(express.json());

// // Database Pool (using Client for simplicity, consider pg.Pool for concurrency)
// // Initialize as null and connect on first use or via middleware
// let usersDbClient = null;
// let estimateRequestsDbClient = null;

// async function getConnectedUsersClient() {
//   if (!usersDbClient) {
//     try {
//       const host = process.env.USERS_DB_HOST || (await functions.secrets.USERS_DB_HOST.value());
//       const port = process.env.USERS_DB_PORT || (await functions.secrets.USERS_DB_PORT.value());
//       const user = process.env.USERS_DB_USER || (await functions.secrets.USERS_DB_USER.value());
//       const password = process.env.USERS_DB_PASSWORD || (await functions.secrets.USERS_DB_PASSWORD.value());
//       const database = process.env.USERS_DB_DATABASE || (await functions.secrets.USERS_DB_DATABASE.value());

//       usersDbClient = new Client({
//         host,
//         port: parseInt(port),
//         user,
//         password,
//         database,
//         ssl: { rejectUnauthorized: false }, // Adjust SSL as per your database's requirements
//       });
//       await usersDbClient.connect();
//       console.log('Users DB Client connected');
//     } catch (err) {
//       console.error('Failed to connect to Users DB Client:', err);
//       throw new Error('Database connection failed for Users'); // Re-throw to prevent function execution
//     }
//   }
//   return usersDbClient;
// }

// async function getConnectedEstimateRequestsClient() {
//   if (!estimateRequestsDbClient) {
//     try {
//       const host = process.env.ESTIMATE_REQUESTS_DB_HOST || (await functions.secrets.ESTIMATE_REQUESTS_DB_HOST.value());
//       const port = process.env.ESTIMATE_REQUESTS_DB_PORT || (await functions.secrets.ESTIMATE_REQUESTS_DB_PORT.value());
//       const user = process.env.ESTIMATE_REQUESTS_DB_USER || (await functions.secrets.ESTIMATE_REQUESTS_DB_USER.value());
//       const password =
//         process.env.ESTIMATE_REQUESTS_DB_PASSWORD || (await functions.secrets.ESTIMATE_REQUESTS_DB_PASSWORD.value());
//       const database =
//         process.env.ESTIMATE_REQUESTS_DB_DATABASE || (await functions.secrets.ESTIMATE_REQUESTS_DB_DATABASE.value());

//       estimateRequestsDbClient = new Client({
//         host,
//         port: parseInt(port),
//         user,
//         password,
//         database,
//         ssl: { rejectUnauthorized: false }, // Adjust SSL as per your database's requirements
//       });
//       await estimateRequestsDbClient.connect();
//       console.log('Estimate Requests DB Client connected');
//     } catch (err) {
//       console.error('Failed to connect to Estimate Requests DB Client:', err);
//       throw new Error('Database connection failed for Estimate Requests');
//     }
//   }
//   return estimateRequestsDbClient;
// }

// // Middleware to ensure DB clients are connected and available on req
// // This is an Express middleware, so it runs for every HTTP request to the Express app.
// app.use(async (req, res, next) => {
//   try {
//     req.usersDbClient = await getConnectedUsersClient();
//     req.estimateRequestsDbClient = await getConnectedEstimateRequestsClient();
//     next();
//   } catch (error) {
//     console.error('Middleware DB connection error:', error);
//     res.status(500).send({ error: 'Database connection error' });
//   }
// });

// // --- Users API Endpoints ---
// app.post('/users', async (req, res) => {
//   try {
//     // const client = await req.usersDbClient.connect(); // No need to reconnect, client is already connected
//     const client = req.usersDbClient; // Use the already connected client
//     const { userId, email, role, firstName, lastName, phoneNumber } = req.body;
//     await client.query(
//       'INSERT INTO users (userId, email, role, firstName, lastName, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)',
//       [userId, email, role, firstName, lastName, phoneNumber],
//     );
//     // client.release(); // No pool, so no release on the single client
//     res.status(201).send({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send({ error: 'Failed to create user' });
//   }
// });

// // Repeat this pattern for all other user endpoints:
// // app.get('/users/:userId', ...), app.put('/users/:userId', ...), app.delete('/users/:userId', ...)
// app.get('/users/:userId', async (req, res) => {
//   try {
//     const client = req.usersDbClient;
//     const { userId } = req.params;
//     const result = await client.query('SELECT * FROM users WHERE userId = $1', [userId]);
//     if (result.rows.length > 0) {
//       res.send(result.rows[0]);
//     } else {
//       res.status(404).send({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error getting user:', error);
//     res.status(500).send({ error: 'Failed to get user' });
//   }
// });

// app.put('/users/:userId', async (req, res) => {
//   try {
//     const client = req.usersDbClient;
//     const { userId } = req.params;
//     const { email, role, firstName, lastName, phoneNumber } = req.body;
//     await client.query(
//       'UPDATE users SET email = $1, role = $2, firstName = $3, lastName = $4, phoneNumber = $5 WHERE userId = $6',
//       [email, role, firstName, lastName, phoneNumber, userId],
//     );
//     res.send({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).send({ error: 'Failed to update user' });
//   }
// });

// app.delete('/users/:userId', async (req, res) => {
//   try {
//     const client = req.usersDbClient;
//     const { userId } = req.params;
//     await client.query('DELETE FROM users WHERE userId = $1', [userId]);
//     res.send({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).send({ error: 'Failed to delete user' });
//   }
// });

// // --- Estimate Requests API Endpoints ---
// app.post('/estimate-requests', async (req, res) => {
//   try {
//     const client = req.estimateRequestsDbClient;
//     const { userId, estimateData, images, scopeOfWork } = req.body;
//     await client.query(
//       'INSERT INTO estimate_requests (userId, estimateData, images, scopeOfWork) VALUES ($1, $2, $3, $4)',
//       [userId, JSON.stringify(estimateData), images, scopeOfWork],
//     );
//     res.status(201).send({ message: 'Estimate request created successfully' });
//   } catch (error) {
//     console.error('Error creating estimate request:', error);
//     res.status(500).send({ error: 'Failed to create estimate request' });
//   }
// });

// // Repeat this pattern for all other estimate request endpoints:
// // app.get('/estimate-requests', ...), app.get('/estimate-requests/:id', ...)
// app.get('/estimate-requests', async (req, res) => {
//   try {
//     const client = req.estimateRequestsDbClient;
//     const result = await client.query('SELECT * FROM estimate_requests');
//     res.send(result.rows);
//   } catch (error) {
//     console.error('Error getting estimate requests:', error);
//     res.status(500).send({ error: 'Failed to get estimate requests' });
//   }
// });

// app.get('/estimate-requests/:id', async (req, res) => {
//   try {
//     const client = req.estimateRequestsDbClient;
//     const { id } = req.params;
//     const result = await client.query('SELECT * FROM estimate_requests WHERE id = $1', [id]);
//     if (result.rows.length > 0) {
//       res.send(result.rows[0]);
//     } else {
//       res.status(404).send({ message: 'Estimate request not found' });
//     }
//   } catch (error) {
//     console.error('Error getting estimate request:', error);
//     res.status(500).send({ error: 'Failed to get estimate request' });
//   }
// });

// app.put('/estimate-requests/:id', async (req, res) => {
//   try {
//     const client = req.estimateRequestsDbClient;
//     const { id } = req.params;
//     const { userId, estimateData, images, scopeOfWork } = req.body;
//     await client.query(
//       'UPDATE estimate_requests SET userId = $1, estimateData = $2, images = $3, scopeOfWork = $4 WHERE id = $5',
//       [userId, JSON.stringify(estimateData), images, scopeOfWork, id],
//     );
//     res.send({ message: 'Estimate request updated successfully' });
//   } catch (error) {
//     console.error('Error updating estimate request:', error);
//     res.status(500).send({ error: 'Failed to update estimate request' });
//   }
// });

// app.delete('/estimate-requests/:id', async (req, res) => {
//   try {
//     const client = req.estimateRequestsDbClient;
//     const { id } = req.params;
//     await client.query('DELETE FROM estimate_requests WHERE id = $1', [id]);
//     res.send({ message: 'Estimate request deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting estimate request:', error);
//     res.status(500).send({ error: 'Failed to delete estimate request' });
//   }
// });

// // Export the Express app as a single HTTP Cloud Function
// exports.api = onRequest(
//   {
//     region: 'us-east1', // Or your preferred region
//     timeoutSeconds: 60, // Adjust as needed
//     // Consider setting memory and minInstances for production
//     // memory: '256MiB',
//     // minInstances: 1, // Keep at least one instance warm for faster cold starts
//   },
//   app,
// );
