import theme from '@/styles/theme';
import { Box, Button, Typography } from '@mui/material';
import CementMixerSvg from '../../../assets/svg/CementMixerSvg/CementMixerSvg';
import Link from 'next/link';

// TO DO:
// 1. TRANSFORM TITLE TO LOOK LIKE A SIGN ON THE SIDE OF THE ROAD
// 2. PASTE CEMENT MIXER SVG CODE INTO A .SVG FILE
// 3. EDIT THE PATHS IN ADOBE ILLUSTRATOR TO PRECISELY ADJUST THE TRANSPARENCY
// OF THE WHEELS, WELLS, AND CEMENT MIXER BODY TO APPEAR TO BE DRIVING IN FRONT
// OF THE SIGN'S POLE
// 4. COPY THE NEW SVG CODE INTO THE CementMixerSvg COMPONENT

const ComingSoon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        p: 0,
        m: 0,
        backgroundColor: theme.palette.background.default, // Example: use your theme
      }}
    >
      <Box flexGrow={1} sx={{ maxWidth: '90vw', justifyContent: 'center', py: { xxs: 5, md: 8, xl: 10 } }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h2" component="h1">
            Under Construction
          </Typography>
          <Box
            sx={{
              animation: '$driveBackAndForth 20s linear infinite',
              display: 'inline-block',
              transformOrigin: 'center center',
              position: 'relative',
              zIndex: 10,
              '@keyframes driveBackAndForth': {
                '0%': {
                  transform: 'translateX(calc(-60vw - 100px)) scaleX(1)',
                },
                '49%': {
                  transform: 'translateX(calc(60vw + 100px)) scaleX(1)',
                },
                '50%': {
                  transform: 'translateX(calc(60vw + 100px)) scaleX(-1)',
                },
                '99%': {
                  transform: 'translateX(calc(-60vw - 100px)) scaleX(-1)',
                },
                '100%': {
                  transform: 'translateX(calc(-60vw - 100px)) scaleX(1)',
                },
              },
            }}
          >
            <Box
              sx={{
                animation: '$bounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate',
                display: 'inline-block',
                position: 'relative',
                zIndex: 10,
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '25%': {
                    transform: 'translateY(-2px)',
                  },
                  '75%': {
                    transform: 'translateY(2px)',
                  },
                },
              }}
            >
              <CementMixerSvg style={{ height: '130px', margin: 0, position: 'relative', zIndex: 10 }} />
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              height: 40,
              border: `1px solid ${theme.palette.text.primary}`,
              backgroundColor: theme.palette.secondary.dark,
              marginTop: theme.spacing(1),
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 0,
              margin: 0,
              mt: '-38px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '100vw',
                height: 2,
                backgroundImage: `repeating-linear-gradient(
                  to right,
                  ${theme.palette.accent.primary},
                  ${theme.palette.accent.primary} 16px,
                  transparent 16px,
                  transparent 32px
                )`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
                backgroundSize: 'auto 2px',
                border: 'none',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ my: 3 }}>
          <Typography variant="h4" component="h2">
            Don't worry, this page will be available soon!
          </Typography>
          <Typography variant="body1" sx={{ mt: 4, mb: 6 }}>
            Our fantastic team is working hard to bring you the best experience. Stay tuned for updates!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              width: 0.75,
              margin: 'auto',
            }}
          >
            <Button
              href="/"
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.accent.primary,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.accent.primary,
                },
              }}
            >
              Go to Homepage
            </Button>
            {/* You can add more links here */}
            <Button
              href="/services"
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.accent.primary,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.accent.primary,
                },
              }}
            >
              Explore Our Services
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
