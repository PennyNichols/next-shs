import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { TextField, Button, Typography, Box } from '@mui/material';
import useStyles from './SubscribeForm.styles';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';

const SubscribeForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'subscribers'), { email });
            setMessage('Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            setMessage('Error subscribing. Please try again.');
            console.error("Error adding document: ", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className={classes.formContainer}>
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                label="Email"
                variant="outlined"
                size='small'
                className={classes.input}

            />
            <ActionButton type="submit" color='secondary' text='Subscribe' />
            {message && <Typography variant="body1">{message}</Typography>}
        </Box>
    );
};

export default SubscribeForm;