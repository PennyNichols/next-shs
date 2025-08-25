'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import { useMedia } from '@/hooks';
import LogoWithTextSvg from '@/assets/svg/LogoWithTextSvg/LogoWithTextSvg';
import theme from '@/styles/theme';
import { AuthForm } from '@/components/auth';
import PageContainer from '@/components/common/PageContainer/PageContainer';

const Auth = () => {
  return <AuthForm />;
};

export default Auth;
