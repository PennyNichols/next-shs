import { Router, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { authenticate } from '../middleware';

const router = Router();

// Helper functions for role-based access control
const isAdminOrSuper = (role: string | undefined): boolean => {
  return role === 'admin' || role === 'super';
};

const isEmployeeOrAbove = (role: string | undefined): boolean => {
  return role === 'employee' || isAdminOrSuper(role);
};

/**
 * POST /estimate-requests
 * Creates a new estimate request.
 * Accessible by: Public (unauthenticated) or Authenticated Clients.
 * If authenticated, userId from token is prioritized.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const {
      userId, // This userId could be provided by unauthenticated users, will be overridden if authenticated
      contactName,
      contactEmail,
      contactPhone,
      propertyAddress,
      serviceType,
      scopeOfWork,
      images,
      notes,
      // ...otherData
    } = req.body;

    // Determine the actual userId: from authenticated user first, then from body (for unauth), otherwise null
    const authenticatedUser = res.locals.user as any;
    const actualUserId = authenticatedUser?.uid || userId || null;

    // Basic server-side validation
    if (!contactName || typeof contactName !== 'string' || contactName.trim() === '') {
      return res.status(400).json({ success: false, error: 'Contact name is required.' });
    }
    if (!contactEmail || typeof contactEmail !== 'string' || !contactEmail.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid contact email is required.' });
    }
    if (
      !propertyAddress ||
      !propertyAddress.street ||
      !propertyAddress.city ||
      !propertyAddress.state ||
      !propertyAddress.zip
    ) {
      return res.status(400).json({ success: false, error: 'Complete property address is required.' });
    }
    if (!serviceType || typeof serviceType !== 'string' || serviceType.trim() === '') {
      return res.status(400).json({ success: false, error: 'Service type is required.' });
    }
    if (!scopeOfWork || !Array.isArray(scopeOfWork) || scopeOfWork.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: 'Scope of work is required and must be a non-empty array.' });
    }
    // More specific validation can be added for images (array of strings, valid URLs), notes (string), etc.

    const newEstimateRequest = {
      userId: actualUserId,
      contactName,
      contactEmail,
      contactPhone: contactPhone || null,
      propertyAddress,
      serviceType,
      scopeOfWork,
      images: images || [],
      notes: notes || null,
      status: 'pending', // Initial status set by the system
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('estimate_requests').add(newEstimateRequest);
    return res.status(201).json({ success: true, id: docRef.id, message: 'Estimate request created successfully.' });
  } catch (error) {
    console.error('Error creating estimate request:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while creating estimate request.' });
  }
});

/**
 * GET /estimate-requests
 * Fetches estimate requests based on user role and query parameters.
 * Accessible by: Admin, Super, Employee (assigned clients), Client (own requests).
 * Query parameters for filtering (status, clientUserId), sorting, and pagination.
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const userRole = user?.role;
    const authenticatedUserId = user?.uid;

    // Extract and sanitize query parameters
    const { status, limit, offset, clientUserId, sortField, sortOrder } = req.query;

    let query: FirebaseFirestore.Query = db.collection('estimate_requests');

    // Apply access control based on role
    if (isAdminOrSuper(userRole)) {
      // Admin/Super users can see all requests or filter by a specific client's ID
      if (typeof clientUserId === 'string' && clientUserId.trim() !== '') {
        query = query.where('userId', '==', clientUserId);
      }
    } else if (isEmployeeOrAbove(userRole)) {
      // Employees can only see requests for clients they are assigned to.
      // This assumes `authenticate` or a preceding process adds `assignedClientIds` to `res.locals.user`.
      const assignedClientIds = user?.assignedClientIds as string[] | undefined;

      if (assignedClientIds && Array.isArray(assignedClientIds) && assignedClientIds.length > 0) {
        // Firestore 'in' query supports up to 10 values
        if (assignedClientIds.length > 10) {
          console.warn(
            'Employee has more than 10 assigned clients, "in" query might fail. Implement chunking or different strategy.',
          );
          // For production, you'd need to chunk the array or fetch clients' requests iteratively.
          // For now, we'll just use the first 10.
          query = query.where('userId', 'in', assignedClientIds.slice(0, 10));
        } else {
          query = query.where('userId', 'in', assignedClientIds);
        }
      } else {
        return res
          .status(403)
          .json({
            success: false,
            error: 'Forbidden: Employee not assigned to any clients or no assigned client IDs found.',
          });
      }
    } else if (userRole === 'client') {
      // Clients can only see their own requests
      query = query.where('userId', '==', authenticatedUserId);
    } else {
      // Fallback for any other unauthorized role or case
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to view estimate requests.' });
    }

    // Apply filters based on query parameters
    if (typeof status === 'string' && status.trim() !== '') {
      query = query.where('status', '==', status);
    }
    // Add more filters later (e.g., serviceType)
    // if (typeof serviceType === 'string' && serviceType.trim() !== '') {
    //     query = query.where('serviceType', '==', serviceType);
    // }

    // Apply sorting
    const orderByField = typeof sortField === 'string' && sortField.trim() !== '' ? sortField : 'createdAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';
    query = query.orderBy(orderByField, orderByDirection);

    // Apply pagination
    if (typeof offset === 'string' && !isNaN(parseInt(offset, 10))) {
      query = query.offset(parseInt(offset, 10));
    }
    if (typeof limit === 'string' && !isNaN(parseInt(limit, 10))) {
      query = query.limit(parseInt(limit, 10));
    }

    const querySnapshot = await query.get();
    const estimateRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json({ success: true, data: estimateRequests });
  } catch (error) {
    console.error('Error fetching estimate requests:', error);
    return res.status(500).json({ success: false, error: 'Internal server error fetching estimate requests.' });
  }
});

/**
 * GET /estimate-requests/:id
 * Fetches a single estimate request by its ID.
 * Accessible by: Admin, Super (any request), Client (only their own request).
 */
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const userRole = user?.role;
    const estimateRequestId = req.params.id;
    const authenticatedUserId = user?.uid;

    const docRef = db.collection('estimate_requests').doc(estimateRequestId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Estimate request not found.' });
    }

    // Authorization check
    const requestData = doc.data();
    if (isAdminOrSuper(userRole)) {
      // Admins/Super can view any estimate request
      return res.status(200).json({ success: true, data: { id: doc.id, ...requestData } });
    } else if (userRole === 'client' && requestData?.userId === authenticatedUserId) {
      // Clients can only view their own requests
      return res.status(200).json({ success: true, data: { id: doc.id, ...requestData } });
    } else {
      // Any other role, or a client trying to view another's request
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to view this estimate request.' });
    }
  } catch (error) {
    console.error('Error fetching single estimate request:', error);
    return res.status(500).json({ success: false, error: 'Internal server error fetching estimate request.' });
  }
});

/**
 * PUT /estimate-requests/:id
 * Updates an existing estimate request.
 * Accessible by: Admin, Super users only.
 */
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const userRole = user?.role;
    const estimateRequestId = req.params.id;

    // Only Admin/Super can update estimate requests
    if (!isAdminOrSuper(userRole)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to update estimate requests.' });
    }

    const docRef = db.collection('estimate_requests').doc(estimateRequestId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Estimate request not found.' });
    }

    const currentData = doc.data();
    const updates = {
      ...req.body, // The fields to update
      updatedAt: new Date().toISOString(), // Always update 'updatedAt'
    };

    // Server-side logic for specific field updates (e.g., status transitions)
    if (updates.status && updates.status !== currentData?.status) {
      // If the status is changing, record who changed it and when
      updates.statusChangedBy = user?.uid; // ID of the admin/super who made the change
      updates.statusChangedAt = new Date().toISOString();
    }

    // You might want to filter `updates` to only allow specific fields to be changed by API
    // For example: delete `userId` from updates if it's not meant to be changed via PUT
    delete updates.userId; // Prevent changing ownership via PUT unless explicitly intended

    await docRef.update(updates);
    return res.status(200).json({ success: true, message: 'Estimate request updated successfully.' });
  } catch (error) {
    console.error('Error updating estimate request:', error);
    return res.status(500).json({ success: false, error: 'Internal server error updating estimate request.' });
  }
});

/**
 * DELETE /estimate-requests/:id
 * Deletes an estimate request.
 * Accessible by: Admin, Super users only.
 */
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const db = getFirestore();
    const user = req.user;
    const userRole = user?.role;
    const estimateRequestId = req.params.id;

    // Only Admin/Super can delete estimate requests
    if (!isAdminOrSuper(userRole)) {
      return res
        .status(403)
        .json({ success: false, error: 'Forbidden: Insufficient permissions to delete estimate requests.' });
    }

    const docRef = db.collection('estimate_requests').doc(estimateRequestId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Estimate request not found.' });
    }

    await docRef.delete();
    return res.status(200).json({ success: true, message: 'Estimate request deleted successfully.' });
  } catch (error) {
    console.error('Error deleting estimate request:', error);
    return res.status(500).json({ success: false, error: 'Internal server error deleting estimate request.' });
  }
});

export default router;
