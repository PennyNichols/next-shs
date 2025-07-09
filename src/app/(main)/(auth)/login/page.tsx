'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import {useMedia} from '@/hooks';
import LogoWithTextSvg from '@/assets/svg/LogoWithTextSvg/LogoWithTextSvg';
import theme from '@/styles/theme';
import {AuthForm} from '@/components/auth';

const Auth = () => {
  const { isXxs: initialIsXxs, isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isXxs, setIsXxs] = useState(false);
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsXxs(initialIsXxs);
    setIsXs(initialIsXs);
    setIsSm(initialIsSm);
  }, [initialIsXxs, initialIsXs, initialIsSm]);
  return (
    <Container className="page-wrapper">
      {!showClientContent ? (
        // Skeleton loading state
        <>
          {!isXxs && !isXs && !isSm && (
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
          {!isXxs && !isXs && !isSm && (
            <Box>
              <LogoWithTextSvg color={theme.palette.primary.main} />
            </Box>
          )}
          <AuthForm />
        </>
      )}
    </Container>
  );
};

export default Auth;
