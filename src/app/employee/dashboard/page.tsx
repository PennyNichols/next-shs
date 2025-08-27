'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';

const EmployeeDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Employee Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assigned Jobs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage your assigned jobs and projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your work schedule and upcoming appointments.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Time Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Log your work hours and track project time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Client Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access client details for your assigned projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generate work reports and project updates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access company resources and documentation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" align="center">
          Employee dashboard features are currently in development.
        </Typography>
      </Box>
    </Container>
  );
};

export default EmployeeDashboard;
