// This file extends the Express Request interface to include the 'user' property.

import { DecodedIdToken } from 'firebase-admin/auth';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  /**
   * Extends the Express Request interface to include a 'user' property.
   * The 'user' property will hold the decoded Firebase ID token,
   * which contains claims about the authenticated user (e.g., uid, email, role).
   * It is marked as optional (?) because the 'authenticate' middleware
   * are not applied to all routes, or the user might not be authenticated.
   */
  interface Request {
    user?: DecodedIdToken;
  }
}
