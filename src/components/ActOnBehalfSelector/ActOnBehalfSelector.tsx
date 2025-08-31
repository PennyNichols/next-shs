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
  Divider,
} from '@mui/material';
import { PersonOutline, AdminPanelSettings, Clear, CancelOutlined } from '@mui/icons-material';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import theme from '@/styles/theme';
import { customTransitions } from '@/styles/theme/otherThemeConstants';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

const ActOnBehalfSelector = ({ handleMenuClose = () => {}, handleAccountMenuClose = () => {}, sx = {} }) => {
  const { currentUser } = useAuth();
  const {
    impersonatedUserId,
    setImpersonatedUserId,
    clearImpersonation,
    isImpersonating,
    canImpersonate,
    canImpersonateUser,
    impersonatedUser,
    isHydrated,
  } = useImpersonation();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Temporarily always show for debugging - remove this later
  const shouldShow = isHydrated && (canImpersonate || currentUser?.role === 'super' || currentUser?.role === 'admin');

  // Don't render during SSR to prevent hydration mismatches
  if (!isHydrated) {
    return null;
  }

  // Don't show if user doesn't have permission
  if (!shouldShow) {
    return null;
  }

  const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  };

  // Create options array for DropdownSelect
  const userOptions = users.map((user) => {
    const displayName = getDisplayName(user);
    return `${displayName ? displayName : user.email} [${user.role}]`;
  });

  // Helper function to get user ID from the selected option string
  const getUserIdFromOption = (optionString: string | null): string | null => {
    if (!optionString) return null;
    const user = users.find((u) => {
      const displayName = getDisplayName(u);
      return optionString === `${displayName} (${u.email}) [${u.role}]`;
    });
    return user?.id || null;
  };

  // Helper function to get option string from user ID
  const getOptionFromUserId = (userId: string | null): string | null => {
    if (!userId) return null;
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    const displayName = getDisplayName(user);
    return `${displayName} (${user.email}) [${user.role}]`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      // Always try to fetch for debugging
      const proceedWithFetch = shouldShow;

      if (!proceedWithFetch) {
        setLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const allUsers = [];

        snapshot.forEach((doc) => {
          try {
            const data = doc.data();
            const user = {
              id: doc.id,
              email: data.email || '',
              firstName: data.first || data.firstName || '',
              lastName: data.last || data.lastName || '',
              role: data.role || data.type || 'client',
            };

            // Only add users with valid data and exclude current user
            if (user.email && user.id !== currentUser?.uid) {
              allUsers.push(user);
            } else {
              console.warn(
                'Skipped user:',
                user.email || user.id,
                'Reason:',
                !user.email ? 'no email' : 'is current user',
              );
            }
          } catch (docError) {
            console.error('Error processing user document:', doc.id, docError);
          }
        });

        // Filter based on current user's role
        let filteredUsers = allUsers;
        if (currentUser?.role === 'admin') {
          // Admin users can see all except super users
          filteredUsers = allUsers.filter((user) => user.role !== 'super');
        }
        // Super users can see all users (no additional filtering needed)

        // Sort by email manually
        filteredUsers.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
        setUsers(filteredUsers);
      } catch (err) {
        setError('Failed to load users for impersonation');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, canImpersonate, shouldShow]);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const selectedUserId = event.target.value;
    console.log('ActOnBehalfSelector - handleUserChange:', selectedUserId);

    if (selectedUserId === '') {
      // Clear impersonation
      console.log('ActOnBehalfSelector - clearing impersonation');
      clearImpersonation();
    } else {
      // Set new impersonation
      console.log('ActOnBehalfSelector - setting impersonation to:', selectedUserId);
      setImpersonatedUserId(selectedUserId);
    }

    handleAccountMenuClose();
    handleMenuClose();
    // Force blur to remove focus state immediately
    setTimeout(() => {
      (event.target as HTMLElement).blur();
    }, 0);
  };

  const handleSelectClose = () => {
    // Additional force blur when menu closes
    setTimeout(() => {
      const selectElement = document.querySelector('.act-on-behalf .MuiSelect-select') as HTMLElement;
      if (selectElement) {
        selectElement.blur();
      }
    }, 0);
  };

  if (loading) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="secondary.light">
          Loading users...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="warning">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{}}>
      <FormControl size="small" className="act-on-behalf">
        <InputLabel id="act-on-behalf-label" className="act-on-behalf">
          Act on Behalf
        </InputLabel>
        <Select
          labelId="act-on-behalf-label"
          value={impersonatedUserId || ''}
          label="Act on Behalf"
          onChange={handleUserChange}
          onClose={handleSelectClose}
          startAdornment={<PersonOutline />}
          endAdornment={
            impersonatedUserId ? (
              <CancelOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  clearImpersonation();
                }}
                sx={{
                  fontSize: '1rem',
                  position: 'absolute',
                  right: '30px',
                  cursor: 'pointer',
                  color: 'text.secondary',
                }}
              />
            ) : null
          }
          className="act-on-behalf"
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
                backgroundColor: 'primary.main',
                '& .MuiMenuItem-root': {
                  '& span': {
                    transition: customTransitions.standard,
                    color: 'secondary.light',
                    fontSize: '.9rem',
                  },
                  '&:hover': {
                    '& span': {
                      color: 'accent.primary',
                    },
                  },
                },
              },
            },
          }}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id} disabled={!canImpersonateUser(user.role)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" color="secondary.main">
                    {getDisplayName(user) || user.email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ActOnBehalfSelector;
