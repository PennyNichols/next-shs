'use client';

import { useEffect } from 'react';

/**
 * Development utilities component that loads role-based routing test functions
 * Only loads in development mode to prevent production bloat
 */
const DevUtilities = () => {
  useEffect(() => {
    // Only load in development mode
    if (process.env.NODE_ENV === 'development') {
      // Dynamically import the test utilities to make them available globally
      import('@/lib/utils/testRoleBasedRouting')
        .then(() => {
          console.log('🧪 Development utilities loaded!');
          console.log('📞 Role-based routing test functions available at: window.testRoleBasedRouting');
          console.log('📋 Try: testRoleBasedRouting.logAvailableRoles()');
        })
        .catch((error) => {
          console.warn('Could not load development utilities:', error);
        });
    }
  }, []);

  // This component renders nothing, it just loads the utilities
  return null;
};

export default DevUtilities;
