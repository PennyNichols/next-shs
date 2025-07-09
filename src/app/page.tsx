'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import ReviewCard from '../components/sections/ReviewCard/ReviewCard';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import PageContainer from '@/components/common/PageContainer/PageContainer';
import { ServicesAccordion } from '@/components/sections';
import VilliageSvg from '@/assets/svg/VilliageSvg/VilliageSvg';

// Example review data (replace with Google review data as needed)
const rawReviews = [
  {
    rating: 5,
    review:
      'Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly.',
    platform: 'Google',
  },
  {
    rating: 4.5,
    review: 'Very satisfied with the work. Will use again.',
    platform: 'Google',
  },
  {
    rating: 5,
    review: 'They went above and beyond. Highly recommend!',
    platform: 'Google',
  },
  {
    rating: 4,
    review: 'Good experience overall, a few minor delays.',
    platform: 'Google',
  },
  {
    rating: 5,
    review: 'Excellent communication and quality.',
    platform: 'Google',
  },
  {
    rating: 5,
    review: 'Superb! The best in the area.',
    platform: 'Google',
  },
];

// Helper to ensure even number of reviews for continuous marquee effect
const getReviews = (rawReviews) => {
  if (rawReviews.length % 2 === 0) {
    return rawReviews;
  } else {
    return [...rawReviews, rawReviews[4]];
  }
};

const CustomDivider = () => {
  return (
    <Box
      sx={{
        width: '50%',
        height: 2,
        backgroundColor: 'accent.primary',
      }}
    />
  );
};

const CustomSeparationDot = () => {
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: customBorderRadius.circle,
        backgroundColor: 'primary.main',
      }}
    />
  );
};

const CustomTitleSideDecoration = () => {
  return (
    <Box
      sx={{
        flex: 1,
        height: 2,
        backgroundColor: 'accent.primary',
        margin: { xs: '5 1', md: 5 },
      }}
    />
  );
};

const Home = () => {
  const reviews = getReviews(rawReviews);

  return (
    <React.Fragment>
      <PageContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            marginTop: { xs: 1, sm: 3 },
            padding: 4,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: customBorderRadius.small,
            width: { xs: '90%', sm: '100%' },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
            }}
          >
            Now Serving These
            <wbr /> Florida Locations
          </Typography>
          <CustomDivider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 8 },
              marginTop: 3,
            }}
          >
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.625rem', lg: '1.75rem' } }}>
              Port Charlotte
            </Typography>
            <CustomSeparationDot />
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' } }}>
              Punta Gorda
            </Typography>
            <CustomSeparationDot />
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' } }}>
              North Port
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
            padding: 2,
            paddingBottom: 4,
            borderRadius: { xs: customBorderRadius.none, sm: customBorderRadius.medium },
            width: '100%',
            maxWidth: 1200,
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              mx: 'auto',
              gap: 4,
            }}
          >
            <CustomTitleSideDecoration />
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                color: 'secondary.light',
              }}
            >
              Our Services
            </Typography>
            <CustomTitleSideDecoration />
          </Box>
          <ServicesAccordion />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            padding: '4 0',
            marginBottom: 2,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: { xs: customBorderRadius.none, sm: customBorderRadius.medium },
            width: '100%',
            maxWidth: 1200,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              m: '0 3',
              mb: 1,
            }}
          >
            What Our <wbr />
            Neighbors Say
          </Typography>
          <Box
            sx={{
              minWidth: '100%',
              position: 'relative',
              minHeight: 220,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: 1,
              }}
            >
              <VilliageSvg
                sx={{
                  width: '60%',
                  height: 'auto',
                  display: 'block',
                  m: '0 auto',
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '120%',
                position: 'absolute',
                left: 0,
                top: { xs: -30, sm: -40 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: 'max-content',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  animation: '$marquee 60s linear infinite',
                  willChange: 'transform',
                  pointerEvents: 'auto',
                  '&:hover': {
                    animationPlayState: 'paused',
                  },
                  '@keyframes marquee': {
                    '0%': {
                      transform: 'translateX(0%)',
                    },
                    '100%': {
                      transform: 'translateX(-50%)',
                    },
                  },
                }}
                tabIndex={0}
              >
                {reviews.map((r, idx) => (
                  <Box
                    key={idx.toString()}
                    sx={{
                      mx: { xs: 2, sm: 5 },
                      transform: `translateY(${idx % 2 === 0 ? -48 : 32}px)`,
                      zIndex: 1,
                      flex: 'none',
                    }}
                  >
                    <ReviewCard rating={r.rating} review={r.review} platform={r.platform} />
                  </Box>
                ))}
                {/* duplicate required for seamless marquee effect */}
                {reviews.map((r, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mx: { xs: 2, sm: 5 },
                      transform: `translateY(${idx % 2 === 0 ? -48 : 32}px)`,
                      zIndex: 1,
                      flex: 'none',
                    }}
                  >
                    <ReviewCard rating={r.rating} review={r.review} platform={r.platform} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </React.Fragment>
  );
};

export default Home;
