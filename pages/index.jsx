import React from 'react';
import useStyles from './styles';
import SubscribeForm from '../components/SubscribeForm';
import CallButton from '../components/ActionButtons/CallButton';
import TextButton from '../components/ActionButtons/TextButton';
import EstimateRequestButton from '../components/ActionButtons/EstimateRequestButton';
import Image from 'next/image';

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Welcome to our Home Services Website!</h1>
            <p className={classes.paragraph}>Find the best professionals for all your home service needs.</p>
            <CallButton />
            <TextButton />
            <EstimateRequestButton />
            <SubscribeForm />
            {/* Add your content and components here */}
        </div>
    );
};

export default Home;