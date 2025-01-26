import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { debounce } from 'lodash';
import { CheckCircle } from '@mui/icons-material';

const CustomRecaptcha = forwardRef(({ onVerify }, ref) => {
    const [challenge, setChallenge] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        generateChallenge();
    }, []);

    useImperativeHandle(ref, () => ({
        reset: () => {
            generateChallenge();
            setUserInput('');
            setError('');
        }
    }));

    const generateChallenge = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        setChallenge(`${num1} + ${num2}`);
    };

    const handleChange = (e) => {
        setUserInput(e.target.value);
        debouncedVerify(e.target.value);
    };

    const verifyAnswer = (input) => {
        const [num1, num2] = challenge.split(' + ').map(Number);
        if (parseInt(input, 10) === num1 + num2) {
            setError('');
            onVerify(true);
            setIsVerified(true);
        } else {
            setError('Incorrect answer. Please try again.');
            onVerify(false);
            setIsVerified(false);
            generateChallenge();
            setUserInput('');
        }
    };

    const debouncedVerify = useCallback(debounce(verifyAnswer, 500), [challenge]);

    return (
        <Box mt={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography variant="body1" marginRight="30px">Are you a human?</Typography>
                <Typography variant="body1" noWrap>{challenge} = </Typography>
                <TextField
                    label=""
                    placeholder='?'
                    value={userInput}
                    onChange={handleChange}
                    sx={{ width: '46px' }}
                    size='small'
                />
                {isVerified && <CheckCircle color="success" />}
            </Box>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
});

export default CustomRecaptcha;