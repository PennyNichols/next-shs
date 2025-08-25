'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Avatar,
  Box,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { PhotoCamera, Save, Cancel } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { UserData } from '@/hooks/auth/useUser';

interface UserProfileEditProps {
  user: UserData;
  open: boolean;
  onClose: () => void;
  isAdminView?: boolean;
}

const userProfileSchema = yup.object().shape({
  first: yup.string().required('First name is required'),
  last: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  type: yup.string().required('User type is required'),
  status: yup.string().required('Status is required'),
  emailVerified: yup.boolean(),
  primaryAddress: yup
    .object()
    .shape({
      street: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zipCode: yup.string(),
      country: yup.string(),
    })
    .nullable(),
});

export const UserProfileEdit: React.FC<UserProfileEditProps> = ({ user, open, onClose, isAdminView = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userProfileSchema),
    defaultValues: {
      first: user.first || '',
      last: user.last || '',
      email: user.email || '',
      phone: user.phone || '',
      type: user.type || 'client',
      status: user.status || 'active',
      emailVerified: user.emailVerified || false,
      primaryAddress: user.primaryAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
      },
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData = {
        ...data,
        updatedOn: new Date().toISOString(),
      };

      await updateDoc(doc(db, 'users', user.id), updateData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // You might want to refresh the user data here
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const userTypes = ['client', 'contractor', 'employee', 'admin'];
  const statusOptions = ['active', 'inactive', 'disabled'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={user.profilePictureURL} sx={{ width: 40, height: 40 }}>
            {user.first?.[0]}
            {user.last?.[0]}
          </Avatar>
          <Typography variant="h6">
            Edit Profile - {user.first} {user.last}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profile updated successfully!
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Profile Picture */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={user.profilePictureURL} sx={{ width: 80, height: 80 }}>
                  {user.first?.[0]}
                  {user.last?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Profile Picture
                  </Typography>
                  <IconButton color="primary" component="label">
                    <PhotoCamera />
                    <input type="file" hidden accept="image/*" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Controller
                name="first"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.first}
                    helperText={errors.first?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="last"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.last}
                    helperText={errors.last?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            {/* Admin-only fields */}
            {isAdminView && (
              <>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>User Type</InputLabel>
                        <Select {...field} label="User Type">
                          {userTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select {...field} label="Status">
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="emailVerified"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Email Verified"
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Primary Address */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Primary Address
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="primaryAddress.street"
                control={control}
                render={({ field }) => <TextField {...field} label="Street Address" fullWidth />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="primaryAddress.city"
                control={control}
                render={({ field }) => <TextField {...field} label="City" fullWidth />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="primaryAddress.state"
                control={control}
                render={({ field }) => <TextField {...field} label="State" fullWidth />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="primaryAddress.zipCode"
                control={control}
                render={({ field }) => <TextField {...field} label="ZIP Code" fullWidth />}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading} startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={loading} startIcon={<Save />}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
