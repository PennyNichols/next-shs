import React, { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Skeleton } from '@mui/material'; // Removed Container from import
import { Facebook, Google, Instagram } from '@mui/icons-material';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import EstimateRequestButton from '../ActionButtons/EstimateRequestButton';
import { EMAIL_ADDRESS, FACEBOOK_URL, GOOGLE_URL, INSTAGRAM_URL, PHONE_NUMBER } from '../../constants/companyDetails';
import { formatPhoneNumber } from '../../functions/utils/utils';
import ReviewButton from '../ActionButtons/ReviewButton';
import LogoSvg from '../SVG/LogoSvg';
import useMedia from '../../hooks/useMedia';
import { customTransitions } from '@/theme/otherThemeConstants';

const Footer = () => {
  const { isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsFullWidth(initialIsXs || initialIsSm);
  }, [initialIsXs, initialIsSm]);

  const contentWrapperSx = {
    maxWidth: { xs: '100%', sm: 600, md: 1200 },
    mx: 'auto',
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'secondary.light',
        pt: { xs: 4, md: 3 },
        pb: 1,
        px: { xs: 4, sm: 5 },
      }}
    >
      {/* Wrapper for the Top Section Grid */}
      <Box sx={{ ...contentWrapperSx, mb: { xs: 3, sm: 5 } }}>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} md={5}>
            <SubscribeForm />
          </Grid>{' '}
          {showClientContent ? (
            <Grid item xs={12} md={7}>
              <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Grid item xs={12} sm={6} md="auto">
                  <ReviewButton fullWidth={isFullWidth} />
                </Grid>
                <Grid item xs={12} sm={6} md="auto">
                  <EstimateRequestButton darkBackground fullWidth={isFullWidth} />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} md={7}>
              <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Grid item xs={12} sm={6} md="auto">
                  <Skeleton variant="rounded" sx={{ width: { xs: '100%', md: 163 } }} height={40.5} />
                </Grid>
                <Grid item xs={12} sm={6} md="auto">
                  <Skeleton variant="rounded" sx={{ width: { xs: '100%', md: 194 } }} height={40.5} />
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
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: { xs: 'center', sm: 'space-around', md: 'space-between' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Grid item xs={12} sm={8} md={5} lg={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: { xs: 'center', sm: 'flex-start', md: 'center' },
                alignItems: { xs: 'flex-start', md: 'center' },
                textAlign: 'center',
                gap: 1,
                '@media (max-width: 350px)': {
                  flexDirection: 'column',
                },
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
            <Grid item xs={0} md={5} lg={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ textAlign: 'left', width: 'fit-content', mx: 'auto' }}>
                <Typography variant="h5" color="inherit">
                  Contact Information
                </Typography>
                <Typography variant="body1" color="inherit">
                  Call:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`tel:${PHONE_NUMBER}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.main' },
                    }}
                  >
                    {formatPhoneNumber(PHONE_NUMBER)}
                  </Link>
                </Typography>
                <Typography variant="body1" color="inherit">
                  Text:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`sms:${PHONE_NUMBER}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.main' },
                    }}
                  >
                    {formatPhoneNumber(PHONE_NUMBER)}
                  </Link>
                </Typography>
                <Typography variant="body1" color="inherit">
                  Email:{' '}
                  <Link
                    component="a"
                    color="inherit"
                    href={`mailto:${EMAIL_ADDRESS}`}
                    sx={{
                      transition: customTransitions.standard,
                      textDecoration: 'none',
                      '&:hover': { color: 'accent.main' },
                    }}
                  >
                    {EMAIL_ADDRESS}
                  </Link>
                </Typography>
              </Box>
            </Grid>
          ) : !showClientContent && !isFullWidth ? (
            <Grid item xs={0} md={5} lg={6} sx={{ display: { xs: 'none', md: 'block' } }}>
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
            xs={0}
            sm={4}
            md={2}
            sx={{
              display: { xs: 'none', sm: 'flex' },
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
                <Typography variant="h5" color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Quick Links
                </Typography>
                <Link
                  href="/privacy-policy"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.main' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/service-terms"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.main' },
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
          <Grid item xs={12} sm={6} order={{ xs: 3, sm: 1 }} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" color="inherit" noWrap>
              &copy; 2025 SHS. All rights reserved.
            </Typography>
          </Grid>{' '}
          <Grid
            item
            xs={12}
            order={2}
            sx={{
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            {showClientContent ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  mx: 0,
                  '@media (max-width: 350px)': {
                    flexDirection: 'column',
                    textAlign: 'center',
                    my: 1,
                  },
                }}
              >
                <Link
                  href="/privacy-policy"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.main' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/service-terms"
                  color="inherit"
                  sx={{
                    transition: customTransitions.standard,
                    '&:hover': { color: 'accent.main' },
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  mx: 0,
                  '@media (max-width: 350px)': {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    my: 1,
                  },
                }}
              >
                <Skeleton variant="text" width={109} height={24} />
                <Skeleton variant="text" width={132} height={24} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'end' }, alignItems: 'center', gap: 1 }}>
              <Link href={FACEBOOK_URL} color="inherit" aria-label="Facebook">
                <Facebook
                  sx={{
                    color: 'accent.main',
                    transition: customTransitions.standard,
                    fontSize: { xs: '3.125rem', sm: '1.75rem' },
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Link>
              <Link href={INSTAGRAM_URL} color="inherit" aria-label="Instagram">
                <Instagram
                  sx={{
                    color: 'accent.main',
                    transition: customTransitions.standard,
                    fontSize: { xs: '3.125rem', sm: '1.75rem' },
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </Link>
              <Link href={GOOGLE_URL} color="inherit" aria-label="Google">
                <Google
                  sx={{
                    color: 'accent.main',
                    transition: customTransitions.standard,
                    fontSize: { xs: '3.125rem', sm: '1.75rem' },
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
