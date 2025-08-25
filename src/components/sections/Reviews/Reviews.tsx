import VilliageSvg from '@/assets/svg/VilliageSvg/VilliageSvg';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import { Box, Typography } from '@mui/material';
import ReviewCard from './ReviewCard/ReviewCard';
import theme from '@/styles/theme';

// Example review data (replace with Google review data as needed)
const rawReviews = [
  {
    rating: 5,
    review:
      'Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly. Outstanding service! Prompt, professional, and friendly.',
    platform: 'Google',
  },
  {
    rating: 4.5,
    review:
      'Very satisfied with the work. Will use again. Very satisfied with the work. Will use again. Very satisfied with the work. Will use again.',
    platform: 'Google',
  },
  {
    rating: 5,
    review:
      'They went above and beyond. Highly recommend!They went above and beyond. Highly recommend! They went above and beyond. Highly recommend!',
    platform: 'Google',
  },
  {
    rating: 4,
    review:
      'Good experience overall, a few minor delays. Good experience overall, a few minor delays. Good experience overall, a few minor delays.',
    platform: 'Google',
  },
  {
    rating: 5,
    review:
      'Excellent communication and quality. Excellent communication and quality. Excellent communication and quality.',
    platform: 'Google',
  },
  {
    rating: 5,
    review: 'Superb! The best in the area. Superb! The best in the area. Superb! The best in the area.',
    platform: 'Google',
  },
];

// Helper to ensure even number of reviews for continuous marquee effect
const getReviews = (rawReviews: Review[]) => {
  if (rawReviews.length % 2 === 0) {
    return rawReviews;
  } else {
    return [...rawReviews, rawReviews[4]];
  }
};

const Reviews = () => {
  const reviews = getReviews(rawReviews);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        padding: theme.spacing(3, 0),
        marginBottom: 2,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        borderRadius: customBorderRadius.medium,
        width: '100%',
        maxWidth: 1535,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontSize: { xxs: '1.75rem', sm: '2.25rem' },
          margin: theme.spacing(0, 2),
        }}
      >
        What Our <wbr />
        Neighbors Say
      </Typography>
      <Box
        sx={{
          width: '100%',
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
            top: { xxs: -30, sm: -40 },
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
              animation: 'marquee 60s linear infinite',
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
                  mx: { xxs: 2, sm: 5 },
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
                  mx: { xxs: 2, sm: 5 },
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
  );
};

export default Reviews;
