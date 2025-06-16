import React from 'react';
import useStyles from './styles';
import { Box, Typography } from '@mui/material';
import ServicesAccordion from '../components/ServicesAccordion/ServicesAccordion';
import { useTheme } from '@mui/material/styles';
import VilliageSvg from '../components/SVG/VilliageSvg';
import ReviewCard from '../components/ReviewCard/ReviewCard';

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

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const reviews = getReviews(rawReviews);

  return (
    <Box className={classes.container}>
      <Box className={classes.serviceAreas}>
        <Typography variant="h2" className={classes.sectionTitle}>
          Now Serving These
          <wbr /> Florida Locations
        </Typography>
        <div className={classes.dividerLine} />
        <Box className={classes.serviceAreasList}>
          <Typography variant="h3" className={classes.serviceAreaListItem}>
            Port Charlotte
          </Typography>
          <div className={classes.separationDot} />
          <Typography variant="h3" className={classes.serviceAreaListItem}>
            Punta Gorda
          </Typography>
          <div className={classes.separationDot} />
          <Typography variant="h3" className={classes.serviceAreaListItem}>
            North Port
          </Typography>
        </Box>
      </Box>
      <Box className={classes.services}>
        <Box className={classes.lightTitleContainer}>
          <div className={classes.lightTitleDecoration} />
          <Typography variant="h2" className={`${classes.sectionTitle} ${classes.lightTitle}`}>
            Our Services
          </Typography>
          <div className={classes.lightTitleDecoration} />
        </Box>
        <ServicesAccordion />
      </Box>
      <Box className={classes.reviews}>
        <Typography variant="h2" className={`${classes.sectionTitle} ${classes.reviewTitle}`}>
          What Our <wbr />
          Neighbors Say
        </Typography>
        <Box className={classes.reviewContentContainer}>
          <Box className={classes.reviewsBg}>
            <VilliageSvg className={classes.reviewsSvg} />
          </Box>
          <Box className={classes.reviewCardsContainer}>
            <Box
              className={`${classes.reviewContent} ${classes.reviewContentMarquee}`}
              tabIndex={0}
              style={{
                pointerEvents: 'auto',
              }}
            >
              {reviews.map((r, idx) => (
                <Box
                  key={r.id}
                  sx={{
                    mx: 5,
                    transform: `translateY(${idx % 2 === 0 ? -48 : 32}px)`,
                    zIndex: 1,
                    flex: 'none',
                    [theme.breakpoints.down('sm')]: {
                      mx: 2,
                    },
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
                    mx: 5,
                    transform: `translateY(${idx % 2 === 0 ? -48 : 32}px)`,
                    zIndex: 1,
                    flex: 'none',
                    [theme.breakpoints.down('sm')]: {
                      mx: 2,
                    },
                  }}
                >
                  <ReviewCard rating={r.rating} review={r.review} platform={r.platform} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
