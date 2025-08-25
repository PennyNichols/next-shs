'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete, Home } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface ServiceAddress {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  label: string;
  isDefault: boolean;
  createdOn: string;
}

interface ServiceAddressManagerProps {
  userId: string;
  addresses: ServiceAddress[];
  isAdminView?: boolean;
}

const addressSchema = yup.object().shape({
  street: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  label: yup.string().required('Label is required'),
  isDefault: yup.boolean(),
});

export const ServiceAddressManager: React.FC<ServiceAddressManagerProps> = ({
  userId,
  addresses,
  isAdminView = false,
}) => {
  const [editingAddress, setEditingAddress] = useState<ServiceAddress | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      label: '',
      isDefault: false,
    },
  });

  const handleAddAddress = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const newAddress: ServiceAddress = {
        id: Date.now(), // Simple ID generation
        ...data,
        createdOn: new Date().toISOString(),
      };

      // If this is set as default, update other addresses
      let updatedAddresses = addresses;
      if (data.isDefault) {
        updatedAddresses = addresses.map((addr) => ({ ...addr, isDefault: false }));
      }

      await updateDoc(doc(db, 'users', userId), {
        serviceAddresses: [...updatedAddresses, newAddress],
        updatedOn: new Date().toISOString(),
      });

      setShowAddForm(false);
      reset();
    } catch (err: any) {
      setError(err.message || 'Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = async (data: any) => {
    if (!editingAddress) return;

    setLoading(true);
    setError(null);

    try {
      const updatedAddresses = addresses.map((addr) => {
        if (addr.id === editingAddress.id) {
          return { ...addr, ...data };
        }
        // If this address is being set as default, remove default from others
        if (data.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      await updateDoc(doc(db, 'users', userId), {
        serviceAddresses: updatedAddresses,
        updatedOn: new Date().toISOString(),
      });

      setEditingAddress(null);
      reset();
    } catch (err: any) {
      setError(err.message || 'Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    setLoading(true);
    setError(null);

    try {
      const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);

      await updateDoc(doc(db, 'users', userId), {
        serviceAddresses: updatedAddresses,
        updatedOn: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message || 'Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  const openEditForm = (address: ServiceAddress) => {
    setEditingAddress(address);
    reset({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      label: address.label,
      isDefault: address.isDefault,
    });
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Service Addresses</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddForm(true)}>
            Add Address
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <List>
          {addresses.map((address) => (
            <ListItem key={address.id} divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1">{address.label}</Typography>
                    {address.isDefault && <Chip label="Default" size="small" color="primary" icon={<Home />} />}
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {address.street}, {address.city}, {address.state} {address.zipCode}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => openEditForm(address)} sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteAddress(address.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {addresses.length === 0 && (
            <ListItem>
              <ListItemText primary="No service addresses" secondary="Add your first service address to get started" />
            </ListItem>
          )}
        </List>

        {/* Add Address Dialog */}
        <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Service Address</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleAddAddress)}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Controller
                    name="label"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address Label"
                        fullWidth
                        error={!!errors.label}
                        helperText={errors.label?.message}
                        placeholder="e.g., Home, Office, Vacation Home"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Street Address"
                        fullWidth
                        error={!!errors.street}
                        helperText={errors.street?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP Code"
                        fullWidth
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="isDefault"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Set as default address"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleSubmit(handleAddAddress)} variant="contained" disabled={loading}>
              {loading ? 'Adding...' : 'Add Address'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Address Dialog */}
        <Dialog open={!!editingAddress} onClose={() => setEditingAddress(null)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Service Address</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleEditAddress)}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Controller
                    name="label"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address Label"
                        fullWidth
                        error={!!errors.label}
                        helperText={errors.label?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Street Address"
                        fullWidth
                        error={!!errors.street}
                        helperText={errors.street?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="State"
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="ZIP Code"
                        fullWidth
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="isDefault"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Set as default address"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingAddress(null)}>Cancel</Button>
            <Button onClick={handleSubmit(handleEditAddress)} variant="contained" disabled={loading}>
              {loading ? 'Updating...' : 'Update Address'}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};
