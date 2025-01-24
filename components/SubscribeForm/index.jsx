import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const SubscribeForm = () => {
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
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SubscribeForm;