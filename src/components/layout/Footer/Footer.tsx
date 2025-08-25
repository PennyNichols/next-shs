'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Skeleton } from '@mui/material';
import { Facebook, Google, Instagram } from '@mui/icons-material';
import SubscribeForm from '../../forms/SubscribeForm/SubscribeForm';
import EstimateRequestButton from '../../action-buttons/EstimateRequestButton/EstimateRequestButton';

import { formatPhoneNumber } from '../../../lib/utils/utils';
import ReviewButton from '../../action-buttons/ReviewButton/ReviewButton';
import LogoSvg from '../../../assets/svg/LogoSvg/LogoSvg';
import useMedia from '../../../hooks/useMedia';
import { customTransitions } from '@/styles/theme/otherThemeConstants';
import {
  COMPANY_EMAIL_ADDRESS,
  COMPANY_FACEBOOK_URL,
  COMPANY_GOOGLE_URL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_PHONE_NUMBER,
} from '@/constants/companyDetails';
import theme from '@/styles/theme';

const Footer = () => {
  const { isXxs: initialIsXxs, isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsFullWidth(initialIsXxs || initialIsXs || initialIsSm);
  }, [initialIsXxs, initialIsXs, initialIsSm]);

  const contentWrapperSx = {
    maxWidth: '1535px',
    mx: 'auto',
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'secondary.light',
        pt: { xxs: 4, md: 3 },
        pb: 1,
        px: { xxs: 4, sm: 5 },
      }}
    >
      {/* Wrapper for the Top Section Grid */}
      <Box sx={{ ...contentWrapperSx, mb: { xxs: 3, sm: 5 } }}>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: { xxs: '100%', md: '900px' },
          }}
        >
          <Grid item xxs={12} lg={5}>
            <SubscribeForm />
          </Grid>{' '}
          {showClientContent ? (
            <Grid item xxs={12} lg={7}>
              <Grid container spacing={2} sx={{ justifyContent: { xxs: 'center', lg: 'flex-end' } }}>
                <Grid item xxs={12} sm={6} lg="auto">
                  <ReviewButton fullWidth={{ xxs: true, lg: false }} />
                </Grid>
                <Grid item xxs={12} sm={6} lg="auto">
                  <EstimateRequestButton
                    color="secondary"
                    iconColor={theme.palette.primary.main}
                    fullWidth={{ xxs: true, lg: false }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xxs={12} lg={7}>
              <Grid container spacing={2} sx={{ justifyContent: { xxs: 'center', lg: 'flex-end' } }}>
                <Grid item xxs={12} sm={6} lg="auto">
                  <Skeleton variant="rounded" sx={{ width: { xxs: '100%', lg: 163 } }} height={40.5} />
                </Grid>
                <Grid item xxs={12} sm={6} lg="auto">
                  <Skeleton variant="rounded" sx={{ width: { xxs: '100%', lg: 194 } }} height={40.5} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Wrapper for the Middle Section Grid */}
      <Box sx={{ ...contentWrapperSx }}>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: { xxs: 'center', sm: 'flex-start' },
            justifyContent: { xxs: 'center', sm: 'space-around', md: 'space-between' },
            textAlign: { xxs: 'center', sm: 'left' },
          }}
        >
          <Grid item xxs={12} sm={8} md={5} lg={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xxs: 'column', xs: 'row' },
                justifyContent: { xxs: 'center', sm: 'flex-start', md: 'center' },
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: { xxs: 2, sm: 0 },
                gap: 1,
              }}
            >
              <Box sx={{ width: 120, height: 110, flexShrink: 0 }}>
                <LogoSvg width={120} height={110} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography noWrap variant="h5" fontWeight={600} color="inherit" mb={0.5}>
                  Serving SW Florida
                </Typography>
                <Typography noWrap variant="h6" color="inherit">
                  Operating Hours: <br /> M-F 8 AM - 5 PM
                </Typography>
              </Box>
            </Box>
          </Grid>{' '}
          {showClientContent && !isFullWidth ? (
            <Grid item xxs={0} md={5} lg={6} sx={{ display: { xxs: 'none', md: 'flex' } }}>
              <Box sx={{ textAlign: 'left', width: 'fit-content', mx: 'auto' }}>
                <Typography variant="h5" color="inherit">
                  Contact Information
                </Typography>
                <Typography variant="body1" color="inherit">
                  Call:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`tel:${COMPANY_PHONE_NUMBER}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.primary' },
                    }}
                  >
                    {formatPhoneNumber(COMPANY_PHONE_NUMBER)}
                  </Link>
                </Typography>
                <Typography variant="body1" color="inherit">
                  Text:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`sms:${COMPANY_PHONE_NUMBER}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.primary' },
                    }}
                  >
                    {formatPhoneNumber(COMPANY_PHONE_NUMBER)}
                  </Link>
                </Typography>
                <Typography variant="body1" color="inherit">
                  Email:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`mailto:${COMPANY_EMAIL_ADDRESS}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.primary' },
                    }}
                  >
                    {COMPANY_EMAIL_ADDRESS}
                  </Link>
                </Typography>
              </Box>
            </Grid>
          ) : !showClientContent && !isFullWidth ? (
            <Grid item xxs={0} md={5} lg={6} sx={{ display: { xxs: 'none', md: 'block' } }}>
              <Box sx={{ textAlign: 'left', width: 'fit-content', mx: 'auto' }}>
                <Skeleton variant="text" width={248} height={32} />
                <Skeleton variant="text" width={248} height={24} />
                <Skeleton variant="text" width={248} height={24} />
                <Skeleton variant="text" width={248} height={24} />
              </Box>
            </Grid>
          ) : null}{' '}
          <Grid
            item
            xxs={0}
            sm={4}
            md={2}
            sx={{
              display: { xxs: 'none', sm: 'flex' },
              justifyContent: { sm: 'flex-end', md: 'center' },
              flexShrink: 1,
            }}
          >
            {showClientContent ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h5" color="inherit" sx={{ display: { xxs: 'none', sm: 'block' } }}>
                  Quick Links
                </Typography>
                <Link
                  href="/privacy-policy"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.primary' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/service-terms"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.primary' },
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Skeleton
                  variant="text"
                  width={132}
                  height={32}
                  sx={{
                    mb: 1,
                  }}
                />
                <Skeleton variant="text" width={132} height={24} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width={132} height={24} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Wrapper for the Bottom Section Grid */}
      <Box sx={{ ...contentWrapperSx, mt: 2 }}>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item xxs={12} sm={6} order={{ xxs: 3, sm: 1 }} sx={{ textAlign: { xxs: 'center', sm: 'left' } }}>
            <Typography variant="body2" color="inherit" noWrap>
              &copy; 2025 SHS. All rights reserved.
            </Typography>
          </Grid>{' '}
          <Grid
            item
            xxs={12}
            order={2}
            sx={{
              display: { xxs: 'flex', sm: 'none' },
            }}
          >
            {showClientContent ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  mx: 0,
                  my: { xxs: 1, xs: 0 },
                  flexDirection: { xxs: 'column', xs: 'row' },
                  textAlign: { xxs: 'center', xs: 'left' },
                }}
              >
                <Link
                  href="/privacy-policy"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.primary' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/service-terms"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.primary' },
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xxs: 'column', xs: 'row' },
                  justifyContent: { xxs: 'center', xs: 'space-between' },
                  alignItems: { xxs: 'center', xs: 'flex-start' },
                  my: { xxs: 1, xs: 0 },
                  width: '100%',
                  mx: 0,
                }}
              >
                <Skeleton variant="text" width={109} height={24} />
                <Skeleton variant="text" width={132} height={24} />
              </Box>
            )}
          </Grid>
          <Grid item xxs={12} sm={6} order={{ xxs: 1, sm: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: { xxs: 'center', sm: 'end' }, alignItems: 'center', gap: 1 }}>
              <Link href={COMPANY_FACEBOOK_URL} color="inherit" aria-label="Facebook">
                <Facebook
                  sx={{
                    color: 'accent.primary',
                    transition: customTransitions.standard,
                    fontSize: { xxs: '3.125rem', sm: '1.75rem' },
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Link>
              <Link href={COMPANY_INSTAGRAM_URL} color="inherit" aria-label="Instagram">
                <Instagram
                  sx={{
                    color: 'accent.primary',
                    transition: customTransitions.standard,
                    fontSize: { xxs: '3.125rem', sm: '1.75rem' },
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Link>
              <Link href={COMPANY_GOOGLE_URL} color="inherit" aria-label="Google">
                <Google
                  sx={{
                    color: 'accent.primary',
                    transition: customTransitions.standard,
                    fontSize: { xxs: '3.125rem', sm: '1.75rem' },
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
