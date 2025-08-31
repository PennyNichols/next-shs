/**
 * Firebase Callable Function: setUserRole
 *
 * Sets a custom role claim on a Firebase Auth user.
 *
 * Usage:
 *
 * import { getFunctions, httpsCallable } from 'firebase/functions';
 *
 * const functions = getFunctions(app, 'us-east1');
 * const setUserRole = httpsCallable(functions, 'setUserRole');
 *
 * try {
 *   const result = await setUserRole({
 *     uid: 'user-uid-here',
 *     role: 'admin' // or 'user', 'moderator', etc.
 *   });
 *   console.log(result.data.message);
 * } catch (error) {
 *   console.error('Error setting user role:', error);
 * }
 *
 * Requirements:
 * - Caller must be authenticated
 * - Both uid and role parameters are required
 *
 * @param data.uid - The Firebase Auth UID of the user to assign the role to
 * @param data.role - The role to assign (string value like 'admin', 'user', 'moderator')
 * @returns Promise<{message: string}> - Success message
 */

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

interface SetUserRoleData {
  uid: string;
  role: string;
}

export const setUserRole = onCall({ region: 'us-east1' }, async (request) => {
  // Check if the request is made by an authenticated user
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const { uid, role } = request.data as SetUserRoleData;

  // Validate input data
  if (!uid || !role) {
    throw new HttpsError('invalid-argument', 'Both uid and role are required.');
  }

  try {
    // Set the custom claim on the user
    await admin.auth().setCustomUserClaims(uid, { role: role });

    return {
      message: `Success! User ${uid} has been assigned the role: ${role}.`,
    };
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw new HttpsError('internal', 'Unable to set custom role.');
  }
});
