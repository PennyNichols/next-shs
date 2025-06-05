import React from 'react';
import useStyles from './styles';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import Award from '../components/Award/Award';

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.serviceAreas}>
        <Typography variant="h2" className={classes.sectionTitle}>
          Now Serving These
          <wbr /> Florida Locations
        </Typography>
        <div className={classes.dividerLine} />
        <Box className={classes.serviceAreasList}>
          <Typography variant="h3" className={classes.servviceAreaListItem}>
            Port Charlotte
          </Typography>
          <div className={classes.separationDot} />
          <Typography variant="h3" className={classes.servviceAreaListItem}>
            Punta Gorda
          </Typography>
          <div className={classes.separationDot} />
          <Typography variant="h3" className={classes.servviceAreaListItem}>
            North Port
          </Typography>
        </Box>
      </Box>
      {/* Add your content and components here */}
    </Box>
  );
};

export default Home;
