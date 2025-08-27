'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { PersonOutline, AdminPanelSettings } from '@mui/icons-material';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

const ActOnBehalfSelector: React.FC = () => {
  const { currentUser } = useAuth();
  const { impersonatedUserId, setImpersonatedUserId, isImpersonating, canImpersonate, canImpersonateUser } =
    useImpersonation();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('ActOnBehalfSelector render - currentUser:', currentUser);
  console.log('ActOnBehalfSelector render - canImpersonate:', canImpersonate);

  // Temporarily always show for debugging - remove this later
  const shouldShow = canImpersonate || currentUser?.role === 'super' || currentUser?.role === 'admin';

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('ActOnBehalfSelector - canImpersonate:', canImpersonate);
      console.log('ActOnBehalfSelector - currentUser?.role:', currentUser?.role);

      // Always try to fetch for debugging
      const proceedWithFetch = shouldShow;

      if (!proceedWithFetch) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching users for impersonation...');

        const usersRef = collection(db, 'users');
        console.log('Created users collection reference');

        const snapshot = await getDocs(usersRef);
        console.log('Firestore query successful, processing documents...');
        console.log('Total documents in snapshot:', snapshot.size);

        const allUsers = [];
        snapshot.forEach((doc) => {
          try {
            const data = doc.data();
            console.log('Processing document:', doc.id, data);

            const user = {
              id: doc.id,
              email: data.email || '',
              firstName: data.first || data.firstName || '',
              lastName: data.last || data.lastName || '',
              role: data.role || data.type || 'client',
            };

            console.log('Processed user:', user);
            console.log('Current user ID:', currentUser?.uid);
            console.log('User has email:', !!user.email);
            console.log('User is not current user:', user.id !== currentUser?.uid);

            // Only add users with valid data and exclude current user
            if (user.email && user.id !== currentUser?.uid) {
              allUsers.push(user);
              console.log('Added user to list:', user.email);
            } else {
              console.log(
                'Skipped user:',
                user.email || user.id,
                'Reason:',
                !user.email ? 'no email' : 'is current user',
              );
            }
          } catch (docError) {
            console.warn('Error processing user document:', doc.id, docError);
          }
        });

        console.log('Total users after processing:', allUsers.length);
        console.log('All users:', allUsers);

        // Filter based on current user's role
        let filteredUsers = allUsers;
        if (currentUser?.role === 'admin') {
          // Admin users can see all except super users
          filteredUsers = allUsers.filter((user) => user.role !== 'super');
        }
        // Super users can see all users (no additional filtering needed)

        // Sort by email manually
        filteredUsers.sort((a, b) => (a.email || '').localeCompare(b.email || ''));

        console.log('Final filtered users:', filteredUsers.length);
        console.log('Final users list:', filteredUsers);
        setUsers(filteredUsers);
      } catch (err) {
        console.error('Error in fetchUsers:', err);
        setError('Failed to load users for impersonation');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, canImpersonate, shouldShow]);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const selectedUserId = event.target.value;
    setImpersonatedUserId(selectedUserId === '' ? null : selectedUserId);
  };

  const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  };

  if (!shouldShow) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="error">
          Debug: Not showing impersonation (canImpersonate: {String(canImpersonate)}, role:{' '}
          {currentUser?.role || 'none'})
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Loading users...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="warning">User impersonation temporarily unavailable. {error}</Alert>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          You can still use dashboard features normally. User selection will be restored once the issue is resolved.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      {isImpersonating && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<AdminPanelSettings />}>
          You are acting on behalf of another user. All actions will be performed as that user.
        </Alert>
      )}

      <FormControl fullWidth size="small">
        <InputLabel id="act-on-behalf-label">Act on Behalf of User</InputLabel>
        <Select
          labelId="act-on-behalf-label"
          value={impersonatedUserId || ''}
          label="Act on Behalf of User"
          onChange={handleUserChange}
          startAdornment={<PersonOutline sx={{ mr: 1, color: 'text.secondary' }} />}
        >
          <MenuItem value="">
            <em>Select a user or act as yourself</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id} disabled={!canImpersonateUser(user.role)}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{getDisplayName(user)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Chip label={user.role} size="small" color="primary" variant="outlined" sx={{ ml: 1 }} />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isImpersonating && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Currently acting as: {users.find((u) => u.id === impersonatedUserId)?.email || 'Unknown user'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ActOnBehalfSelector;
