import { Box, Container, Grid, Typography } from '@mui/material';
import CallButton from '../ActionButtons/CallButton';
import TextButton from '../ActionButtons/TextButton';
import EstimateRequestButton from '../ActionButtons/EstimateRequestButton';
import Image from 'next/image';
import theme from '@/theme';
import { ContentBox, Section } from 'components/ReusableComponents/baseComponents';
import { Web } from '@mui/icons-material';

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

const shinyEffect = {
  position: 'relative',
  background: `linear-gradient(
    90deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.main} 42%,
rgba(229, 230, 235, 0.55) 50%,
    ${theme.palette.primary.main} 58%,
    ${theme.palette.primary.main} 100%
  )`,
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'shine 5s linear infinite',
  '@keyframes shine': {
    '0%': {
      backgroundPosition: '100% -40%',
    },
    '100%': {
      backgroundPosition: '-100% -40%',
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

const CustomHeader = ({ text, sx = {}, className = '' }) => {
  return (
    <Typography variant="h1" className={`hero-header ${className}`} component="h1" sx={{ ...sx }}>
      {text}
    </Typography>
  );
};

const Hero = () => {
  return (
    <Container className="hero-container">
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
        {/* letterSpacing: '1.8rem !important',  */}
        <Section sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography variant="h1" component="h1" className="company-name hero-header">
            <span>S</span>
            <span>H</span>
            <span>S</span>
            <span> </span>
            <span>F</span>
            <span>L</span>
            <span>O</span>
            <span>R</span>
            <span>I</span>
            <span>D</span>
            <span>A</span>
          </Typography>
          <Box>
            <Box>
              <CustomHeader text="Expert Hands." sx={{ fontWeight: '700 !important', fontSize: '2.1rem !important' }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: '0.8rem',
                  marginBottom: '3rem',
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  className="hero-header"
                  sx={{
                    display: 'inline-block !important',
                    transform: 'skewX(-20deg)',
                    ...shinyEffect,
                  }}
                >
                  Exceptional
                </Typography>
                <Typography variant="h1" component="h1" className="hero-header">
                  Results.
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              component="p"
              className="hero-description"
              sx={{
                my: 3,
              }}
            >
              From routine maintenance to complex projects, we handle every aspect of your home's upkeep with precision
              and care.
            </Typography>
          </Box>
        </Section>
        <Section sx={{ width: '100%' }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <CallButton />
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <TextButton />
            </Grid>
            <Grid item xs={12} sm={10} md={4}>
              <EstimateRequestButton fullWidth={true} />
            </Grid>
          </Grid>
        </Section>
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
      </Box>
    </Container>
  );
};

export default Hero;
