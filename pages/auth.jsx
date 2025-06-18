import React from 'react';
import { Box } from '@mui/material';
import AuthForm from '../components/Forms/AuthForm/AuthForm';
import useStyles from './styles';
import theme from '@/theme/theme';
import useMedia from '../hooks/useMedia';

const Auth = () => {
  const classes = useStyles();
  const { isXs, isSm } = useMedia();

  return (
    <Box className={classes.authWrapper}>
      {!isXs && !isSm && (
        <Box>
          <img
            src="/images/logoWithTextDark.svg"
            alt="SHS Icon"
            width={550}
            height={450}
            style={{ display: 'block', padding: theme.spacing(5) }}
          />
        </Box>
      )}
      <AuthForm />
    </Box>
  );
};

export default Auth;
