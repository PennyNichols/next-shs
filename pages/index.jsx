import React from 'react';
import useStyles from './styles';
import SubscribeForm from '../components/SubscribeForm';
import CallButton from '../components/ActionButtons/CallButton';
import TextButton from '../components/ActionButtons/TextButton';
import EstimateRequestButton from '../components/ActionButtons/EstimateRequestButton';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ReviewButton from '../components/ActionButtons/ReviewButton';
import { EmojiEvents, Grade, Star } from '@mui/icons-material';
import Award from '../components/Award/Award';

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.leftContent}>
        <Typography variant="h1" sx={{ marginBottom: 0 }}>
          {' '}
          The SHS Difference
        </Typography>
        <div className={classes.divider}></div>
        <Typography variant="body1">
          At Schmidt's Home Services, we understand that maintaining your home requires a level of expertise and
          attention to detail that goes beyond the ordinary. With 17 years of experience serving discerning homeowners,
          we've built a reputation for providing unparalleled home improvement services. Our team of highly skilled
          professionals is dedicated to delivering exceptional craftsmanship and meticulous care in every project we
          undertake. From routine maintenance and expert repairs to seamless renovations and custom projects, we handle
          every detail with precision and efficiency. Our team operates with the utmost professionalism and ensures
          clear communication throughout every stage of the process. At SHS, your satisfaction is our highest priority.
        </Typography>
      </Box>
      <Box className={classes.rightContent}>
        <Award />
        <Box className={classes.imageContainer}>
          <Image
            src="/images/garden-shed-2.jpg"
            alt="Custom Garden Shed"
            width={500}
            height={500}
            className={classes.image}
          />
        </Box>
      </Box>
      {/* Add your content and components here */}
    </Box>
  );
};

export default Home;
