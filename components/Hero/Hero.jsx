import { Box, Grid, Typography } from '@mui/material';
import CallButton from '../ActionButtons/CallButton';
import TextButton from '../ActionButtons/TextButton';
import EstimateRequestButton from '../ActionButtons/EstimateRequestButton';
import Image from 'next/image';
import theme from '@/theme';

const bgScrollEffect = {
  background: `linear-gradient(to bottom, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark})`,
  backgroundSize: '100% 1000%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  display: 'inline-block',
  lineHeight: '1',
  verticalAlign: 'middle',
  animationTimingFunction: 'linear',
  animation: '$gradientMovement 20s linear infinite',
  '@keyframes gradientMovement': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '100%': {
      backgroundPosition: '0% -100%',
    },
  },
};
const ScrollIcon = () => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '1.875rem',
        ...bgScrollEffect,
      }}
    >
      &#8595;
    </Typography>
  );
};

const ScrollText = () => {
  return (
    <Typography
      variant="body2"
      sx={{
        fontSize: '1.5rem',
        marginLeft: 3,
        marginRight: 3,
        ...bgScrollEffect,
      }}
    >
      Scroll for more
    </Typography>
  );
};

const CustomHeader = ({ text }) => {
  return (
    <Typography
      variant="h1"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '4rem' },
      }}
    >
      {text}
    </Typography>
  );
};

const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: { xs: '100vh', sm: '75vh', md: '65vh' },
      }}
    >
      {' '}
      <Image src="/images/poolWithPalms.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, rgba(27, 78, 130, 0.8), rgba(255, 255, 255, 0.8))',
          alignContent: 'bottom',
          px: 5,
          py: { xs: 2, sm: 5 },
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="flex-end" sx={{ position: 'relative' }}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3 }}>
            <Box gap={0}>
              <CustomHeader text="SHS Florida" />
              <CustomHeader text="Expert Hands." />
              <CustomHeader text="Exceptional Results." />
            </Box>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' } }}>
              From routine maintenance to complex projects, we handle every aspect of your home's upkeep with precision
              and care.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              mt: { xs: 8, md: 6 },
            }}
          >
            <CallButton />
            <TextButton />
            <EstimateRequestButton />
          </Grid>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              mt: { xs: 6 },
              mb: 1,
            }}
          >
            <ScrollIcon />
            <ScrollIcon />
            <ScrollText />
            <ScrollIcon />
            <ScrollIcon />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
