import { Box, Typography } from '@mui/material';
import React from 'react';
import ServicesAccordion from '../../components/ServicesAccordion/ServicesAccordion';

const ServicesPage = () => {
  return (
    <Box className={classes.servicesPageContainer}>
      <Box className={classes.servicesPageTitleContainer}>
        <Typography variant="h2" className={classes.servicesPageTitle}>
          Our Services
        </Typography>
      </Box>
      <ServicesAccordion />
    </Box>
  );
};

export default ServicesPage;
