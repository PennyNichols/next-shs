import React from 'react';
import useStyles from './styles';
import SubscribeForm from '../components/SubscribeForm';
import CallButton from '../components/ActionButtons/CallButton';
import TextButton from '../components/ActionButtons/TextButton';
import EstimateRequestButton from '../components/ActionButtons/EstimateRequestButton';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
            <Typography variant='h5'>From routine maintenance to complex projects, we handle every aspect of your home's upkeep with precision and care.</Typography>
            <CallButton />
            <TextButton />
            <EstimateRequestButton />
            {/* Add your content and components here */}
        </Box>
    );
};

export default Home;