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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import { Add, Edit, Delete, Lock, Public, Note } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import useUser from '@/hooks/auth/useUser';

interface UserNote {
  id: number;
  message: string;
  author: string;
  isInternal: boolean;
  createdBy: string;
  createdOn: string;
  updatedOn: string;
}

interface UserNotesProps {
  userId: string;
  notes: UserNote[];
  isAdminView?: boolean;
}

const noteSchema = yup.object().shape({
  message: yup.string().required('Message is required').min(1, 'Message cannot be empty'),
  isInternal: yup.boolean(),
});

export const UserNotes: React.FC<UserNotesProps> = ({
  userId,
  notes,
  isAdminView = false,
}) => {
  const { user: currentUser } = useUser();
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      message: '',
      isInternal: false,
    },
  });

  const handleAddNote = async (data: any) => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const newNote: UserNote = {
        id: Date.now(),
        message: data.message,
        author: `${currentUser.first} ${currentUser.last}`,
        isInternal: data.isInternal,
        createdBy: currentUser.id,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      };

      await updateDoc(doc(db, 'users', userId), {
        notes: [...notes, newNote],
        updatedOn: new Date().toISOString(),
      });

      setShowAddForm(false);
      reset();
    } catch (err: any) {
      setError(err.message || 'Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleEditNote = async (data: any) => {
    if (!editingNote || !currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const updatedNotes = notes.map(note => {
        if (note.id === editingNote.id) {
          return {
            ...note,
            message: data.message,
            isInternal: data.isInternal,
            updatedOn: new Date().toISOString(),
          };
        }
        return note;
      });

      await updateDoc(doc(db, 'users', userId), {
        notes: updatedNotes,
        updatedOn: new Date().toISOString(),
      });

      setEditingNote(null);
      reset();
    } catch (err: any) {
      setError(err.message || 'Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    setLoading(true);
    setError(null);

    try {
      const updatedNotes = notes.filter(note => note.id !== noteId);

      await updateDoc(doc(db, 'users', userId), {
        notes: updatedNotes,
        updatedOn: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message || 'Failed to delete note');
    } finally {
      setLoading(false);
    }
  };

  const openEditForm = (note: UserNote) => {
    setEditingNote(note);
    reset({
      message: note.message,
      isInternal: note.isInternal,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter notes based on user permissions
  const visibleNotes = notes.filter(note => {
    if (isAdminView) return true; // Admins see all notes
    return !note.isInternal; // Regular users only see public notes
  });

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">User Notes</Typography>
          {(isAdminView || currentUser?.type === 'admin') && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAddForm(true)}
            >
              Add Note
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <List>
          {visibleNotes.map((note, index) => (
            <React.Fragment key={note.id}>
              <ListItem alignItems="flex-start">
                <Box display="flex" alignItems="flex-start" gap={2} width="100%">
                  <Avatar sx={{ bgcolor: note.isInternal ? 'warning.main' : 'primary.main' }}>
                    <Note />
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle2" color="text.primary">
                        {note.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(note.createdOn)}
                      </Typography>
                      {note.isInternal && (
                        <Chip
                          label="Internal"
                          size="small"
                          color="warning"
                          icon={<Lock />}
                        />
                      )}
                      {!note.isInternal && (
                        <Chip
                          label="Public"
                          size="small"
                          color="success"
                          icon={<Public />}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.primary">
                      {note.message}
                    </Typography>
                    {note.updatedOn !== note.createdOn && (
                      <Typography variant="caption" color="text.secondary">
                        Updated: {formatDate(note.updatedOn)}
                      </Typography>
                    )}
                  </Box>
                  {(isAdminView || currentUser?.id === note.createdBy) && (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => openEditForm(note)}
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteNote(note.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </ListItem>
              {index < visibleNotes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {visibleNotes.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No notes available"
                secondary="No notes have been added for this user yet"
              />
            </ListItem>
          )}
        </List>

        {/* Add Note Dialog */}
        <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add User Note</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleAddNote)}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Note Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    sx={{ mt: 2 }}
                  />
                )}
              />
              {isAdminView && (
                <Controller
                  name="isInternal"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Internal Note (only visible to staff)"
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button
              onClick={handleSubmit(handleAddNote)}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Note'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Note Dialog */}
        <Dialog open={!!editingNote} onClose={() => setEditingNote(null)} maxWidth="md" fullWidth>
          <DialogTitle>Edit User Note</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleEditNote)}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Note Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    sx={{ mt: 2 }}
                  />
                )}
              />
              {isAdminView && (
                <Controller
                  name="isInternal"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Internal Note (only visible to staff)"
                      sx={{ mt: 2 }}
                    />
                  )}
                />
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingNote(null)}>Cancel</Button>
            <Button
              onClick={handleSubmit(handleEditNote)}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Note'}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};
