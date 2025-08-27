'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';

const ContractorDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contractor Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage your current construction projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Bids
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submit bids for new projects and track bid status.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Invoicing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage invoices for completed work.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Materials & Supplies
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track materials, supplies, and project costs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Client Communication
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Communicate with clients about project progress.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documentation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access project documents, permits, and contracts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" align="center">
          Contractor dashboard features are currently in development.
        </Typography>
      </Box>
    </Container>
  );
};

export default ContractorDashboard;
