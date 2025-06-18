import theme from '@/theme/theme';
import { Box, Button, Typography } from '@mui/material';
import CementMixerSvg from '../SVG/CementMixerSvg';
import Link from 'next/link';
import useStyles from './ComingSoon.styles';

// TO DO:
// 1. TRANSFORM TITLE TO LOOK LIKE A SIGN ON THE SIDE OF THE ROAD
// 2. PASTE CEMENT MIXER SVG CODE INTO A .SVG FILE
// 3. EDIT THE PATHS IN ADOBE ILLUSTRATOR TO PRECISELY ADJUST THE TRANSPARENCY
// OF THE WHEELS, WELLS, AND CEMENT MIXER BODY TO APPEAR TO BE DRIVING IN FRONT
// OF THE SIGN'S POLE
// 4. COPY THE NEW SVG CODE INTO THE CementMixerSvg COMPONENT

const ComingSoon = () => {
  const classes = useStyles();
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
      <Box flexGrow={1} p={3} sx={{ maxWidth: '90vw', justifyContent: 'center' }}>
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
          <Box className={classes.cementMixerDrive}>
            <Box className={classes.cementMixerBounce}>
              <CementMixerSvg style={{ height: '130px', margin: 0, position: 'relative', zIndex: 10 }} />
            </Box>
          </Box>
          <Box className={classes.road} style={{ margin: 0, marginTop: '-38px' }}>
            <Box className={classes.roadLine} />
          </Box>
        </Box>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h2" sx={{ my: 2 }}>
            Don't worry, this page will be available soon!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
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
            <Link href="/" passHref legacyBehavior>
              <Button
                as="a"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.accent.main,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.accent.main,
                  },
                }}
              >
                Go to Homepage
              </Button>
            </Link>
            {/* You can add more links here */}
            <Link href="/services" passHref legacyBehavior>
              <Button
                as="a"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.accent.main,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.accent.main,
                  },
                }}
              >
                Explore Our Services
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
