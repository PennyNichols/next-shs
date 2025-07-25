'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Dashboard,
  People,
  RequestQuote,
  Settings,
  Analytics,
  Assignment,
  Notifications,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
} from '@mui/icons-material';
import { UserProfile } from '@/components/profile/UserProfile/UserProfile';
import { StaffRoute } from '@/components/auth/RouteGuard/RouteGuard';
import useUser from '@/hooks/auth/useUser';
import { UserData } from '@/hooks/auth/useUser';

function AdminDashboardContent() {
  const { user, loading } = useUser();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'users' | 'requests' | 'analytics' | 'settings'>(
    'dashboard',
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading admin dashboard...
        </Typography>
      </Box>
    );
  }

  if (!user || !['admin', 'employee'].includes(user.type)) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Access denied. Admin privileges required.
        </Typography>
      </Box>
    );
  }

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { key: 'users', label: 'User Management', icon: <People /> },
    { key: 'requests', label: 'Estimate Requests', icon: <RequestQuote /> },
    { key: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { key: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement onSelectUser={setSelectedUser} />;
      case 'requests':
        return <EstimateRequestManagement />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <AdminDashboardOverview user={user} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 280,
          p: 2,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* User Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Avatar src={user.profilePictureURL} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}>
            {user.first?.[0]}
            {user.last?.[0]}
          </Avatar>
          <Typography variant="h6">
            {user.first} {user.last}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Chip label={user.type} size="small" color="error" sx={{ mt: 1 }} />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.key}
              button
              selected={activeSection === item.key}
              onClick={() => setActiveSection(item.key as any)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Quick Actions */}
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          Quick Actions
        </Typography>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} startIcon={<Add />}>
          Add User
        </Button>
        <Button variant="outlined" fullWidth startIcon={<Notifications />}>
          Send Notice
        </Button>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {selectedUser ? (
          <Box>
            <Button onClick={() => setSelectedUser(null)} sx={{ mb: 2 }}>
              ← Back to {activeSection}
            </Button>
            <UserProfile userId={selectedUser} isAdminView={true} />
          </Box>
        ) : (
          renderContent()
        )}
      </Box>
    </Box>
  );
}

const AdminDashboardOverview = ({ user }: { user: UserData }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Admin Dashboard
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Welcome back, {user.first}. Here's your business overview.
    </Typography>

    <Grid container spacing={3}>
      {/* Quick Stats */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <People color="primary" />
              <Box>
                <Typography variant="h6">1,234</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <RequestQuote color="primary" />
              <Box>
                <Typography variant="h6">56</Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Requests
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Assignment color="primary" />
              <Box>
                <Typography variant="h6">89</Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Projects
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Analytics color="primary" />
              <Box>
                <Typography variant="h6">$45,678</Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly Revenue
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent System Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="New user registered" secondary="John Smith - 30 minutes ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RequestQuote />
                </ListItemIcon>
                <ListItemText primary="Estimate request submitted" secondary="Kitchen renovation - 1 hour ago" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Project completed" secondary="Bathroom remodel - 2 hours ago" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* System Status */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Database</Typography>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">API Services</Typography>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Email Service</Typography>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Storage</Typography>
                <Chip label="85% Used" color="warning" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const UserManagement = ({ onSelectUser }: { onSelectUser: (userId: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - in real app, this would come from a users collection query
  const mockUsers = [
    {
      id: '1',
      first: 'John',
      last: 'Doe',
      email: 'john@example.com',
      type: 'client',
      status: 'active',
      createdOn: '2024-01-15T10:00:00Z',
      serviceAddresses: [{ street: '123 Main St', city: 'Orlando', state: 'FL' }],
    },
    {
      id: '2',
      first: 'Jane',
      last: 'Smith',
      email: 'jane@example.com',
      type: 'contractor',
      status: 'active',
      createdOn: '2024-02-20T14:30:00Z',
      serviceAddresses: [],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'disabled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'admin':
        return 'error';
      case 'employee':
        return 'warning';
      case 'contractor':
        return 'info';
      case 'client':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* Search and Filter */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Filter">
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="admin">Admins</MenuItem>
            <MenuItem value="employee">Employees</MenuItem>
            <MenuItem value="contractor">Contractors</MenuItem>
            <MenuItem value="client">Clients</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" startIcon={<Add />}>
          Add User
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Addresses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>
                      {user.first[0]}
                      {user.last[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body1">
                        {user.first} {user.last}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={user.type} color={getTypeColor(user.type)} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={user.status} color={getStatusColor(user.status)} size="small" />
                </TableCell>
                <TableCell>{new Date(user.createdOn).toLocaleDateString()}</TableCell>
                <TableCell>{user.serviceAddresses?.length || 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onSelectUser(user.id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const EstimateRequestManagement = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Estimate Request Management
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">Estimate requests management interface would be implemented here.</Typography>
      </CardContent>
    </Card>
  </Box>
);

const AnalyticsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Analytics & Reports
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">Analytics dashboard with charts and reports would be implemented here.</Typography>
      </CardContent>
    </Card>
  </Box>
);

const SettingsView = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      System Settings
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body1">System configuration and settings would be implemented here.</Typography>
      </CardContent>
    </Card>
  </Box>
);

export default function AdminDashboard() {
  return (
    <StaffRoute>
      <AdminDashboardContent />
    </StaffRoute>
  );
}
