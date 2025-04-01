import React from 'react';
import { Box } from '@mui/material';
import AuthForm from '../components/Forms/AuthForm/AuthForm';
import useStyles from './styles';
import theme from '@/theme/theme';
import useMedia from '../hooks/useMedia';

const Auth = () => {
  const classes = useStyles();
  const { isMobile, isSmallTablet } = useMedia();

  return (
    <Box className={classes.authWrapper}>
      {!isMobile && !isSmallTablet && (
        <Box>
          <img
            src="/images/logoWithTextDark.svg"
            alt="SHS Icon"
            width={450}
            height={350}
            style={{ display: 'block', padding: theme.spacing(5) }}
          />
        </Box>
      )}
      <AuthForm />
    </Box>
  );
};

export default Auth;
