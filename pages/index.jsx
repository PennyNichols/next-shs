import React from 'react';
import useStyles from './styles';
import SubscribeForm from '../components/SubscribeForm';
import CallButton from '../components/ActionButtons/CallButton';
import TextButton from '../components/ActionButtons/TextButton';
import EstimateRequestButton from '../components/ActionButtons/EstimateRequestButton';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ReviewButton from '../components/ActionButtons/ReviewButton';

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>

            {/* Add your content and components here */}
        </Box>
    );
};

export default Home;