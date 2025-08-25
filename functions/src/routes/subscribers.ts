// functions/src/routes/subscribers.ts
import { Router, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { authenticate } from '../middleware'; // Adjust path if needed

const router = Router();

// Helper to check for admin/super roles
const isAdminOrSuper = (role: string | undefined): boolean => {
  return role === 'admin' || role === 'super';
};

/**
 * GET /subscribers
 * Fetches all subscribers from the database.
 * Accessible by: Admin and Super users only.
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const userRole = (res.locals.user as any)?.role; // Role attached by authenticate

    // Check for necessary permissions
    if (!isAdminOrSuper(userRole)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to view subscribers.' });
    }

    const querySnapshot = await db.collection('subscribers').get();
    const subscribers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while fetching subscribers.' });
  }
});

/**
 * DELETE /subscribers/:id
 * Deletes a subscriber by their ID.
 * Accessible by: Admin and Super users only.
 */
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const userRole = (res.locals.user as any)?.role;
    const subscriberId = req.params.id;

    // Check for necessary permissions
    if (!isAdminOrSuper(userRole)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to delete subscribers.' });
    }

    const subscriberRef = db.collection('subscribers').doc(subscriberId);
    const doc = await subscriberRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Subscriber not found.' });
    }

    await subscriberRef.delete();
    return res.status(200).json({ success: true, message: 'Subscriber deleted successfully.' });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while deleting subscriber.' });
  }
});

/**
 * TODO: Add a POST /subscribers route to manage
 * email subscriptions entirely through the backend. Use
 * Cloud Functions to interact with a third-party email service after
 * storing the subscriber in Firestore.
 *
 * Example placeholder for POST /subscribers:
 *
 * router.post('/', async (req: Request, res: Response) => {
 * try {
 * const { email } = req.body;
 *
 * // Basic validation
 * if (!email || typeof email !== 'string' || !email.includes('@')) {
 * return res.status(400).json({ success: false, error: 'A valid email address is required.' });
 * }
 *
 * // Check if already subscribed (optional)
 * const existingSubscriber = await db.collection('subscribers').where('email', '==', email).limit(1).get();
 * if (!existingSubscriber.empty) {
 * return res.status(409).json({ success: false, error: 'Email already subscribed.' });
 * }
 *
 * const newSubscriber = {
 * email,
 * subscribedAt: new Date().toISOString(),
 * status: 'active' // or 'pending' if you have a verification step
 * };
 *
 * const docRef = await db.collection('subscribers').add(newSubscriber);
 * return res.status(201).json({ success: true, id: docRef.id, message: 'Successfully subscribed!' });
 * } catch (error) {
 * console.error('Error creating subscriber:', error);
 * return res.status(500).json({ success: false, error: 'Internal server error while subscribing.' });
 * }
 * });
 */

export default router;
