import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import AuthForm from '../components/Forms/AuthForm/AuthForm';
import useMedia from '../hooks/useMedia';

const Auth = () => {
  const { isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsXs(initialIsXs);
    setIsSm(initialIsSm);
  }, [initialIsXs, initialIsSm]);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        p: { xs: 3, md: 5 },
        gap: 3,
      }}
    >
      {!showClientContent ? (
        // Skeleton loading state
        <>
          {!isXs && !isSm && (
            <Box>
              <Skeleton variant="rectangular" width={550} height={450} sx={{ borderRadius: 2 }} />
            </Box>
          )}
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={48} sx={{ mb: 2, borderRadius: 1 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="80%" />
          </Box>
        </>
      ) : (
        // Actual content
        <>
          {!isXs && !isSm && (
            <Box>
              <img
                src="/images/logoWithTextDark.svg"
                alt="SHS Icon"
                width={550}
                height={450}
                style={{ display: 'block', p: 5 }}
              />
            </Box>
          )}
          <AuthForm />
        </>
      )}
    </Box>
  );
};

export default Auth;
