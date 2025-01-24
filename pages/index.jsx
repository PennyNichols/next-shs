import React from 'react';
import useStyles from './styles';
import SubscribeForm from '../components/SubscribeForm';

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Welcome to our Home Services Website!</h1>
            <p className={classes.paragraph}>Find the best professionals for all your home service needs.</p>
            <SubscribeForm />
            {/* Add your content and components here */}
        </div>
    );
};

export default Home;